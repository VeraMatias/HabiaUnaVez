# Generated by Django 4.2.5 on 2023-10-04 20:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryProduct',
            fields=[
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='Fecha de Modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='Fecha de Eliminacion')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=50, unique=True, verbose_name='Descripcion')),
            ],
            options={
                'verbose_name': 'Categoria de Producto',
                'verbose_name_plural': 'Categorias de Productos',
            },
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='Fecha de Modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='Fecha de Eliminacion')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, verbose_name='Nombre del Proveedor')),
                ('url', models.URLField(verbose_name='Pagina Web')),
                ('armhole', models.CharField(choices=[('C', 'Chica'), ('N', 'Normal'), ('G', 'Grande')], max_length=1, verbose_name='Moldería')),
            ],
            options={
                'verbose_name': 'Proveedor',
                'verbose_name_plural': 'Proveedores',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateField(auto_now_add=True, verbose_name='Fecha de creacion')),
                ('modified_date', models.DateField(auto_now=True, verbose_name='Fecha de Modificacion')),
                ('deleted_date', models.DateField(auto_now=True, verbose_name='Fecha de Eliminacion')),
                ('code', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('quantity', models.IntegerField(default=1)),
                ('cost', models.IntegerField(default=0)),
                ('price', models.IntegerField(default=0)),
                ('description', models.CharField(blank=True, max_length=100, null=True, verbose_name='Descripcion')),
                ('image', models.ImageField(blank=True, null=True, upload_to='products/', verbose_name='Imagen del Producto')),
                ('category_product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.categoryproduct', verbose_name='Categoria de Producto')),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.supplier', verbose_name='Proveedor')),
            ],
            options={
                'verbose_name': 'Producto',
                'verbose_name_plural': 'Productos',
            },
        ),
    ]
