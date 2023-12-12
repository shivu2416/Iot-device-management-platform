from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    
    OPERATOR = 'operator'
    ENGINEER = 'engineer'
    MANAGER = 'manager'
    OWNER = 'owner'
    
    ROLES = (
        ('operator', 'Lev Operator'),
        ('engineer', 'Lev Engineer'),
        ('manager', 'Lev Manager'),
        ('owner', 'Owner'),
    )
    
    bio = models.TextField(
        blank=True, 
        verbose_name=_("Bio"),
        default=''
    )
    role =  models.CharField(
        max_length=50, choices=ROLES,
        default=OPERATOR,
        verbose_name=_('Role'),
    )
    def __str__(self):
        return self.username