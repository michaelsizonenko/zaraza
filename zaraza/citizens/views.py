from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from citizens.models import Citizen, Temperature
from citizens.serializers import CitizenSerializer, TemperatureSerializer


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
def citizen_detail(request, pk):
    """
    Retrieve, update or delete a citizen
    """
    try:
        citizen = Citizen.objects.get(pk=pk)
    except Citizen.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CitizenSerializer(citizen)
        return JsonResponse(serializer.data)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CitizenSerializer(citizen, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    if request.method == 'DELETE':
        citizen.delete()
        return HttpResponse(status=204)

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
        data = JSONParser.parse(request)
        serializer = TemperatureSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    raise Exception("Unexpected method")
