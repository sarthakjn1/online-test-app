from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import MasterCategory
from ..serializers import MasterCategorySerializer

@api_view(["POST"])
def add_master_category(request):
    data = request.data
    many = isinstance(data, list)
    serializer = MasterCategorySerializer(data=data, many=many)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def update_master_category(request, pk):
    try:
        category = MasterCategory.objects.get(pk=pk)
    except MasterCategory.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = MasterCategorySerializer(category, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_master_category(request, pk):
    try:
        category = MasterCategory.objects.get(pk=pk)
        category.delete()
        return Response({"message": "Deleted"}, status=status.HTTP_200_OK)
    except MasterCategory.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
