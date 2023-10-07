# Generated by Django 4.2.5 on 2023-10-07 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bags',
            fields=[
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='Fecha de Modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='Fecha de Eliminacion')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Nombre')),
            ],
            options={
                'verbose_name': 'Bolso',
                'verbose_name_plural': 'bolsos',
            },
        ),
    ]
