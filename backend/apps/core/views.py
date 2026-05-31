from django.db import connection
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    db_status = "connected"

    try:
        connection.ensure_connection()
    except Exception:
        db_status = "error"

    is_healthy = db_status == "connected"

    return Response(
        {
            "status": "online" if is_healthy else "degraded",
            "message": "Backend de Decora Con Arte operativo",
            "database": db_status,
        },
        status=status.HTTP_200_OK if is_healthy else status.HTTP_503_SERVICE_UNAVAILABLE,
    )