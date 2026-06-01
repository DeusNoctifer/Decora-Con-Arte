import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

PHONE_REGEX = re.compile(r"^\+?1?\d{7,15}$")
PHONE_FORMAT_CHARS = re.compile(r"[\s\-().]")


def normalize_phone(value: str) -> str:
    return PHONE_FORMAT_CHARS.sub("", value.strip())


def validate_phone(value: str) -> str:
    if not value:
        return value

    normalized = normalize_phone(value)
    if not PHONE_REGEX.match(normalized):
        raise ValidationError(
            _(
                "El número de teléfono debe tener entre 7 y 15 dígitos "
                "(puedes usar espacios, guiones o paréntesis)."
            )
        )
    return normalized
