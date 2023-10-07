# Generated by Django 4.2.5 on 2023-10-07 19:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_alter_product_code_alter_product_cost_and_more'),
        ('bags', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='Fecha de Modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='Fecha de Eliminacion')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Nombre')),
            ],
            options={
                'verbose_name': 'Institucion',
                'verbose_name_plural': 'Instituciones',
            },
        ),
        migrations.AlterModelOptions(
            name='bags',
            options={'verbose_name': 'Bolso', 'verbose_name_plural': 'Bolsos'},
        ),
        migrations.AlterField(
            model_name='bags',
            name='name',
            field=models.CharField(max_length=50, unique=True, verbose_name='Nombre'),
        ),
        migrations.CreateModel(
            name='Sent',
            fields=[
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='Fecha de Modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='Fecha de Eliminacion')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('products', models.ManyToManyField(to='products.product', verbose_name='productos enviados')),
            ],
            options={
                'verbose_name': 'Enviado',
                'verbose_name_plural': 'Enviados',
            },
        ),
        migrations.CreateModel(
            name='Received',
            fields=[
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='Fecha de Modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='Fecha de Eliminacion')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('products', models.ManyToManyField(to='products.product', verbose_name='productos recibidos')),
            ],
            options={
                'verbose_name': 'Recibido',
                'verbose_name_plural': 'Recibidos',
            },
        ),
        migrations.CreateModel(
            name='Not_received',
            fields=[
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='Fecha de Modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='Fecha de Eliminacion')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('products', models.ManyToManyField(to='products.product', verbose_name='productos no devueltos')),
            ],
            options={
                'verbose_name': 'No devuelto',
                'verbose_name_plural': 'No devueltos',
            },
        ),
        migrations.AddField(
            model_name='bags',
            name='institution',
            field=models.ForeignKey(default=123, on_delete=django.db.models.deletion.CASCADE, to='bags.institution', verbose_name='Productos Enviados'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bags',
            name='products_not_received',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='bags.not_received', verbose_name='Productos Enviados'),
        ),
        migrations.AddField(
            model_name='bags',
            name='products_received',
            field=models.ForeignKey(default=123, on_delete=django.db.models.deletion.CASCADE, to='bags.received', verbose_name='Productos Recibidos'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bags',
            name='products_sent',
            field=models.ForeignKey(default=123, on_delete=django.db.models.deletion.CASCADE, to='bags.sent', verbose_name='Productos Enviados'),
            preserve_default=False,
        ),
    ]
