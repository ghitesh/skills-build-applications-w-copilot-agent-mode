from django.urls import path

from .views import (
    activity_list,
    api_root,
    health,
    leaderboard_list,
    seeded_data_summary,
    team_list,
    user_list,
    workout_list,
)

app_name = 'tracker'

urlpatterns = [
    path('', api_root, name='api_root'),
    path('health/', health, name='health'),
    path('seeded-data/', seeded_data_summary, name='seeded-data'),
    path('users/', user_list, name='user-list'),
    path('teams/', team_list, name='team-list'),
    path('activities/', activity_list, name='activity-list'),
    path('leaderboard/', leaderboard_list, name='leaderboard-list'),
    path('workouts/', workout_list, name='workout-list'),
]
