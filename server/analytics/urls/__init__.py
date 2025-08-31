from django.urls import path, include

urlpatterns = [
    path("category/", include("analytics.urls.category_urls")),
    path("user/", include("analytics.urls.user_urls")),
    path("overall/", include("analytics.urls.overall_urls")),
]
