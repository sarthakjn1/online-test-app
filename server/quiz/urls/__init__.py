from django.urls import path, include

urlpatterns = [
    path("master_category/", include("quiz.urls.master_category_urls")),
    path("question/", include("quiz.urls.question_urls")),
    path("option/", include("quiz.urls.option_urls")),
    path("results/", include("quiz.urls.results_urls")),
]