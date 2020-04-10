import functools

from django.contrib.postgres.search import SearchQuery
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from citizens.models import Citizen, Temperature
from citizens.phone_verification_controller import PhoneVerificationController
from citizens.serializers import CitizenSerializer, TemperatureSerializer, VerificationPhoneNumberRequestSerializer
from citizens.utils import validate_phone_number


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
            query=request.GET.get('query', '').split()
            if len(query)==0:
                return HttpResponse(status=404)

            searchVector=functools.reduce(lambda result,word : result & SearchQuery(word),query,SearchQuery(''))
            citizens = Citizen.objects.filter(search_vector=searchVector)
            serializer = TemperatureSerializer(citizens, many=True)
            return JsonResponse(serializer.data, safe=False)
        except Citizen.DoesNotExist:
            return HttpResponse(status=404)
    raise Exception("Unexpected method")


@csrf_exempt
def temperature_list(request):
    """
    List all temperature rows, or create a new temperature row
    """
    if request.method == 'GET':
        temperature = Temperature.objects.all()
        serializer = TemperatureSerializer(temperature, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        citizen = Citizen.objects.get(hash=data['hash'])
        serializer = TemperatureSerializer(data={'citizen': citizen, 'temperature': data['temperature']})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
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
