
from django.contrib import admin
from django.urls import path
from .views import home_view, tweet_action , tweet_detile ,tweet_list,tweet_create_view,tweet_delete
urlpatterns = [
    path('',tweet_list),
    path('action/',tweet_action),
    path('create/',tweet_create_view),
    path('<int:tweet_id>/',tweet_detile),
    path('<int:tweet_id>/delete/',tweet_delete)
]
