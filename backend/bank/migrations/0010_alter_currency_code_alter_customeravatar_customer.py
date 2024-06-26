# Generated by Django 5.0.6 on 2024-05-20 02:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0009_alter_currency_code_customeravatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currency',
            name='code',
            field=models.CharField(choices=[('CAD', 'Canadian dollar'), ('GBP', 'British pound sterling'), ('JPY', 'Japanese yen'), ('EUR', 'Euro'), ('USD', 'United States dollar'), ('AUD', 'Australian dollar'), ('CHF', ' Swiss franc')], max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='customeravatar',
            name='customer',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='avatars', to='bank.customer'),
        ),
    ]
