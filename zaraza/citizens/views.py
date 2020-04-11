import functools
import operator

from django.contrib.postgres.search import SearchQuery
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from citizens.models import Citizen, Temperature
from citizens.phone_verification_controller import PhoneVerificationController
from citizens.serializers import CitizenSerializer, TemperatureSerializer, VerificationPhoneNumberRequestSerializer
from citizens.utils import validate_phone_number

from django.db.models import Lookup
from django.db.models.fields import Field


@Field.register_lookup
class Like(Lookup):
    lookup_name = 'like'

    def as_sql(self, compiler, connection):
        lhs, lhs_params = self.process_lhs(compiler, connection)
        rhs, rhs_params = self.process_rhs(compiler, connection)
        params = lhs_params + rhs_params
        return 'LOWER(%s) LIKE LOWER(%s)' % (lhs, rhs), params


@csrf_exempt
def citizen_list(request):
    """
    List all citizens, or create a new citizen.
    """
    if request.method == 'GET':
        citizens = Citizen.objects.all()
        serializer = CitizenSerializer(citizens, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CitizenSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    raise Exception("Unexpected method")


@csrf_exempt
def citizen_detail(request):
    """
    Retrieve, update or delete a citizen
    """
    if request.method == 'GET':
        try:
            query = request.GET.get('query', '').split()
            if len(query) == 0:
                return HttpResponse(status=404)

            list_of_lookups = [Citizen.objects.filter(full_text__like=f"%{str.strip()}%") for str in query]
            combined = functools.reduce(operator.and_, list_of_lookups)
            serializer = CitizenSerializer(combined, many=True)
            return JsonResponse(serializer.data, safe=False)
        except Citizen.DoesNotExist:
            return HttpResponse(status=404)
    raise Exception("Unexpected method")


@csrf_exempt
def temperature_list(request):
    """
    List all temperature rows, or create a new temperature row
    """
    # if request.method == 'GET':
    #     temperature = Temperature.objects.all()
    #     serializer = TemperatureSerializer(temperature, many=True)
    #     return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        citizen = Citizen.objects.get(hash=data['hash'])
        data = {
            'temperature': data['temperature'],
            'citizen': citizen,
            'citizen_id': citizen.id
        }
        serializer = TemperatureSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(status=201)
        return JsonResponse(serializer.errors, status=400)

    raise Exception("Unexpected method")


@csrf_exempt
def send_verification_code(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        valid_phone_number = validate_phone_number(data['phone_number'])
        verification_controller = PhoneVerificationController.get_instance()
        data['verification_code'] = verification_controller.send_verification_message(valid_phone_number)
        serializer = VerificationPhoneNumberRequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=500)

    raise Exception("Unexpected method")
