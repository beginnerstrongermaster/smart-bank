# Generated by Django 5.0.6 on 2024-05-20 01:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0008_alter_currency_code_alter_transaction_currency_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currency',
            name='code',
            field=models.CharField(choices=[('JPY', 'Japanese yen'), ('AUD', 'Australian dollar'), ('CAD', 'Canadian dollar'), ('USD', 'United States dollar'), ('EUR', 'Euro'), ('CHF', ' Swiss franc'), ('GBP', 'British pound sterling')], max_length=255, unique=True),
        ),
        migrations.CreateModel(
            name='CustomerAvatar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ImageField(upload_to='bank/avatars')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='avatars', to='bank.customer')),
            ],
        ),
    ]
