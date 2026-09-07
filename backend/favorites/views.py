import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Favorite

DEFAULT_USER_KEY = 'default'


def _favorite_ids(user_key=DEFAULT_USER_KEY):
    return list(
        Favorite.objects.filter(user_key=user_key).values_list('surah_id', flat=True)
    )


@require_http_methods(['GET'])
def favorite_list(request):
    user_key = request.GET.get('userKey', DEFAULT_USER_KEY)
    return JsonResponse({'favorites': _favorite_ids(user_key)})


@csrf_exempt
@require_http_methods(['POST'])
def toggle_favorite(request):
    try:
        payload = json.loads(request.body or '{}')
        surah_id = int(payload['surahId'])
    except (KeyError, TypeError, ValueError, json.JSONDecodeError):
        return JsonResponse({'error': 'surahId is required'}, status=400)

    user_key = payload.get('userKey') or DEFAULT_USER_KEY
    favorite, created = Favorite.objects.get_or_create(
        user_key=user_key,
        surah_id=surah_id,
    )

    if created:
        is_favorite = True
    else:
        favorite.delete()
        is_favorite = False

    return JsonResponse({
        'surahId': surah_id,
        'isFavorite': is_favorite,
        'favorites': _favorite_ids(user_key),
    })
