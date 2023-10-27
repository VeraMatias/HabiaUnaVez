# Generated by Django 4.2.5 on 2023-10-17 03:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_alter_product_code_alter_product_cost_and_more'),
        ('bags', '0005_rename_relationproductsent_productsent_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='productsent',
            options={'verbose_name': 'Producto enviado', 'verbose_name_plural': 'Productos enviados'},
        ),
        migrations.CreateModel(
            name='ProductReceived',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
                ('received', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bags.received')),
            ],
            options={
                'verbose_name': 'Producto recibido',
                'verbose_name_plural': 'Productos recibidos',
            },
        ),
        migrations.RemoveField(
            model_name='received',
            name='products',
        ),
        migrations.AddField(
            model_name='received',
            name='products',
            field=models.ManyToManyField(through='bags.ProductReceived', to='products.product', verbose_name='productos recibidos'),
        ),
    ]