from collections.abc import Iterable
from django.db import models
from user.models import User
from django.utils.translation import gettext_lazy as _

from timescale.db.models.fields import TimescaleDateTimeField
from timescale.db.models.managers import TimescaleManager
from django.utils.timezone import now



class Device(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE,
        verbose_name=_("User"),
        related_name=_("user")
    )
    serial_number = models.CharField(
        max_length=50, unique=True
    )
    manufacturer = models.CharField(
        max_length=100
    )
    purchase_date = models.DateField(auto_now=True)
    is_active = models.BooleanField(
        default=True
        )


    def __str__(self):
        return self.name
    
    

class TimescaleModel(models.Model):
    """
    A helper class for using Timescale within Django, has the TimescaleManager and
    TimescaleDateTimeField already present. This is an abstract class it should
    be inheritted by another class for use.
    """

    time = TimescaleDateTimeField(interval="1 day",default=now)
    objects = TimescaleManager()

    class Meta:
        abstract = True


class DeviceData(TimescaleModel):
    """
    Represents data recorded from a device.
    """
    ONLINE = "online"
    OFFLINE = "offline"
    
    
    STATUS_CHOICES = (
        (ONLINE, _("Online")),
        (OFFLINE, _("Offline")),
        
    )
    
    device_id = models.IntegerField()
    timestamp = models.DateTimeField()
    temperature = models.FloatField(null=True, blank=True)
    humidity = models.FloatField(null=True, blank=True)

    value = models.FloatField(default=0,blank=True, null=True)
    location = models.CharField(
        max_length=255, null=True, blank=True,
        verbose_name=_('Location'),
    )
    status = models.CharField(
        max_length=50, choices=STATUS_CHOICES,
        default=ONLINE,
        verbose_name=_('Status'),
    )
    battery_level = models.IntegerField(
        null=True, blank=True,
        verbose_name=_('Battery Level')
    )
    def __str__(self):
        device_obj = Device.objects.using("default").get(
            id = self.device_id
            )
        return f"{device_obj} - {self.timestamp}"
    