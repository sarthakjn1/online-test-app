from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import Option
from ..serializers import OptionSerializer

@api_view(["POST"])
def add_option(request):
    data = request.data
    many = isinstance(data, list)  # support bulk insert
    serializer = OptionSerializer(data=data, many=many)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def update_option(request, pk):
    try:
        option = Option.objects.get(pk=pk)
    except Option.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = OptionSerializer(option, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_option(request, pk):
    try:
        option = Option.objects.get(pk=pk)
        option.delete()
        return Response({"message": "Deleted"}, status=status.HTTP_200_OK)
    except Option.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
