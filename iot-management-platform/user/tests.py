from django.test import TestCase
from . models import User

class UserModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.operator_user = User.objects.create_user(
            username='operator_user',
            password='password123',
            role=User.OPERATOR,
            bio='This is the operator user.',
        )

        cls.engineer_user = User.objects.create_user(
            username='engineer_user',
            password='password123',
            role=User.ENGINEER,
            bio='This is the engineer user.',
        )

        cls.manager_user = User.objects.create_user(
            username='manager_user',
            password='password123',
            role=User.MANAGER,
            bio='This is the manager user.',
        )

        cls.owner_user = User.objects.create_user(
            username='owner_user',
            password='password123',
            role=User.OWNER,
            bio='This is the owner user.',
        )

    def test_user_creation(self):
        self.assertEqual(self.operator_user.role, User.OPERATOR)
        self.assertEqual(self.engineer_user.role, User.ENGINEER)
        self.assertEqual(self.manager_user.role, User.MANAGER)
        self.assertEqual(self.owner_user.role, User.OWNER)

    def test_user_str_method(self):
        self.assertEqual(str(self.operator_user), 'operator_user')
        self.assertEqual(str(self.engineer_user), 'engineer_user')
        self.assertEqual(str(self.manager_user), 'manager_user')
        self.assertEqual(str(self.owner_user), 'owner_user')
