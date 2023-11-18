import './ProductListContainer.css'

import { useEffect} from 'react'
import { useProductList } from '../hooks/useProductList';
import ProductCardContainer from './ProductCardContainer';
import DropdownList from '../components/General/DropdownList/DropdowList';
import InputSearch from '../components/General/InputSearch/InputSearch'

const ProductListContainer = () => {
    const {productsToShow, loadProducts, categories, filterCategory, suppliers, filterSupplier, filterProduct } = useProductList()

    useEffect(() =>{loadProducts();},[])

    return(
        <div className="container-product-list">
            <div className="product-list-header">
                <h2 className='header-title'>PRODUCTOS</h2>
                <div className="header-buttons">
                    <DropdownList items={categories} title={'Categorías'} handleClick={filterCategory}/>
                    <DropdownList items={suppliers} title={'Proveedores'} handleClick={filterSupplier}/>
                    <InputSearch handleInput = {filterProduct} />
                </div>
            </div>
            <ProductCardContainer products={productsToShow} />
        </div>
        )
}

export default ProductListContainer