from django.urls import path

from . import views

urlpatterns = [
    path('favorites/', views.favorite_list, name='favorite-list'),
    path('favorites/toggle/', views.toggle_favorite, name='toggle-favorite'),
]
