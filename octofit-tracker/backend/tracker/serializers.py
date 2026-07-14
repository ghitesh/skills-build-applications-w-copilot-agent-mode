from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, User, Workout


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'age', 'fitness_level', 'team_id']


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'sport', 'captain_id', 'members']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'user_id', 'activity_type', 'duration_minutes', 'distance_km', 'calories_burned', 'date']


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user_id', 'total_points', 'rank']


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'user_id', 'title', 'focus', 'duration_minutes', 'difficulty']
