from django.db import models


class BaseDocumentModel(models.Model):
    class Meta:
        abstract = True


class User(BaseDocumentModel):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    fitness_level = models.CharField(max_length=50)
    team_id = models.CharField(max_length=24, blank=True, null=True)


class Team(BaseDocumentModel):
    name = models.CharField(max_length=255, unique=True)
    sport = models.CharField(max_length=100)
    captain_id = models.CharField(max_length=24)
    members = models.JSONField(default=list)


class Activity(BaseDocumentModel):
    user_id = models.CharField(max_length=24)
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.IntegerField()
    distance_km = models.FloatField(blank=True, null=True)
    calories_burned = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)


class LeaderboardEntry(BaseDocumentModel):
    user_id = models.CharField(max_length=24)
    total_points = models.IntegerField()
    rank = models.IntegerField()


class Workout(BaseDocumentModel):
    user_id = models.CharField(max_length=24)
    title = models.CharField(max_length=255)
    focus = models.CharField(max_length=100)
    duration_minutes = models.IntegerField()
    difficulty = models.CharField(max_length=50)
