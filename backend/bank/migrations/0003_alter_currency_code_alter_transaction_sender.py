# Generated by Django 5.0.5 on 2024-05-08 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currency',
            name='code',
            field=models.CharField(choices=[('CHF', ' Swiss franc'), ('GBP', 'British pound sterling'), ('AUD', 'Australian dollar'), ('USD', 'United States dollar'), ('EUR', 'Euro'), ('CAD', 'Canadian dollar'), ('JPY', 'Japanese yen')], max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='sender',
            field=models.CharField(max_length=255),
        ),
    ]