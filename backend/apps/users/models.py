from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator, EmailValidator
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.db import models

def validate_date_not_in_future(value):
    if value > timezone.now().date():
        raise ValidationError(_('La fecha de nacimiento no puede estar en el futuro.'))

class CustomUserManager(BaseUserManager):
    def create_user(self, email, names, surnames, password=None, **extra_fields):
        if not email:
            raise ValueError(_('El usuario debe tener un correo electrónico'))
        
        email = self.normalize_email(email).lower()

        user = self.model(email=email, names=names, surnames=surnames, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, names, surnames, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('El superusuario debe tener is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('El superusuario debe tener is_superuser=True.'))

        return self.create_user(email, names, surnames, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    
    class GenderChoices(models.TextChoices):
        MALE = 'M', _('Masculino')
        FEMALE = 'F', _('Femenino')
        OTHER = 'O', _('Otro')

    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{7,15}$',
        message=_("El número de teléfono debe tener el formato: '+999999999'. Hasta 15 dígitos permitidos.")
    )

    names = models.CharField(_("nombres"), max_length=150)
    surnames = models.CharField(_("apellidos"), max_length=150)
    
    email = models.EmailField(
        _("correo electrónico"), 
        unique=True,
        validators=[EmailValidator(message=_("Introduce un correo electrónico válido."))]
    )
    
    tel = models.CharField(
        _("teléfono"), 
        validators=[phone_regex],
        max_length=20, 
        blank=True, 
        null=True
    )
    gender = models.CharField(
        _("género"), 
        max_length=1, 
        choices=GenderChoices.choices, 
        default=GenderChoices.OTHER
    )
    
    date_of_birth = models.DateField(
    _("fecha de nacimiento"), 
    validators=[validate_date_not_in_future],
    blank=True, 
    null=True
)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False) 

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['names', 'surnames']

    objects = CustomUserManager()

    class Meta:
        db_table = 'users'
        verbose_name = _('usuario')
        verbose_name_plural = _('usuarios')

    def __str__(self):
        return f"{self.names} {self.surnames} ({self.email})"

    @property
    def age(self):
        if self.date_of_birth:
            today = timezone.now().date()
            return today.year - self.date_of_birth.year - (
                (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
            )
        return None