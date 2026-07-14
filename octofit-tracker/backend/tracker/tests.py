from django.test import SimpleTestCase, TestCase
from django.urls import reverse


class HealthCheckTests(SimpleTestCase):
    def test_health_check_returns_expected_payload(self):
        response = self.client.get(reverse('tracker:health'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})


class ApiEndpointTests(TestCase):
    def test_api_root_lists_supported_collections(self):
        response = self.client.get(reverse('tracker:api_root'))

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload['collections'], ['users', 'teams', 'activities', 'leaderboard', 'workouts'])

    def test_users_endpoint_returns_documents(self):
        response = self.client.get(reverse('tracker:user-list'))

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIsInstance(payload, list)
