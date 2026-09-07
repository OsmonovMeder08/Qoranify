from django.db import models


class Favorite(models.Model):
    user_key = models.CharField(max_length=64, default='default', db_index=True)
    surah_id = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
        constraints = [
            models.UniqueConstraint(
                fields=['user_key', 'surah_id'],
                name='unique_favorite_surah_per_user_key',
            ),
        ]

    def __str__(self):
        return f'{self.user_key}: {self.surah_id}'
