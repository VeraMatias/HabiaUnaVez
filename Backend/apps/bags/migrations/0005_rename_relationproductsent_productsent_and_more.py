# Generated by Django 4.2.5 on 2023-10-17 03:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_alter_product_code_alter_product_cost_and_more'),
        ('bags', '0004_relationproductsent_alter_sent_products'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='RelationProductSent',
            new_name='ProductSent',
        ),
        migrations.AlterModelOptions(
            name='productsent',
            options={'verbose_name': 'Relacion productos enviados', 'verbose_name_plural': 'Relaciones productos enviados'},
        ),
    ]