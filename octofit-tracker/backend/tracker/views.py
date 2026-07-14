from pathlib import Path

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Activity, LeaderboardEntry, Team, User, Workout
from .serializers import ActivitySerializer, LeaderboardEntrySerializer, TeamSerializer, UserSerializer, WorkoutSerializer


@api_view(['GET'])
def health(request):
    return Response({'status': 'ok'})


@api_view(['GET'])
def api_root(request):
    return Response({
        'message': 'Octofit Tracker API',
        'collections': ['users', 'teams', 'activities', 'leaderboard', 'workouts'],
        'endpoints': {
            'users': '/users/',
            'teams': '/teams/',
            'activities': '/activities/',
            'leaderboard': '/leaderboard/',
            'workouts': '/workouts/',
        },
    })


@api_view(['GET'])
def seeded_data_summary(request):
    script_path = Path(__file__).resolve().parent.parent / 'src' / 'scripts' / 'seed.ts'
    if not script_path.exists():
        return JsonResponse({'error': 'seed script not found'}, status=404)

    payload = {
        'message': 'Seed the octofit_db database with test data',
        'script': str(script_path),
        'collections': ['users', 'teams', 'activities', 'leaderboard', 'workouts'],
    }
    return JsonResponse(payload)


@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def team_list(request):
    teams = Team.objects.all()
    serializer = TeamSerializer(teams, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def activity_list(request):
    activities = Activity.objects.all()
    serializer = ActivitySerializer(activities, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def leaderboard_list(request):
    entries = LeaderboardEntry.objects.all()
    serializer = LeaderboardEntrySerializer(entries, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def workout_list(request):
    workouts = Workout.objects.all()
    serializer = WorkoutSerializer(workouts, many=True)
    return Response(serializer.data)
