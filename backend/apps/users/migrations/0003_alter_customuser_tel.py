# Generated manually

import apps.users.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_customuser_date_of_birth_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='tel',
            field=models.CharField(
                blank=True,
                max_length=20,
                null=True,
                validators=[apps.users.models.phone_validator],
                verbose_name='teléfono',
            ),
        ),
    ]
