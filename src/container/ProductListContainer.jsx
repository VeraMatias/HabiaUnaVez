import './ProductListContainer.css'

import { useEffect} from 'react'
import { useProductList } from '../hooks/useProductList';
import ProductCardContainer from './ProductCardContainer';

const ProductListContainer = ({}) => {

    const {products, loadProducts} = useProductList()

    useEffect(() =>{loadProducts();},[])

    return(
        <div className="container-product-list">
            <div className="product-list-header">
                <h2 className='header-title'>PRODUCTOS</h2>
                <div className="header-buttons">
                    {/* <ButtonNew onClick ={toggleModalCreate}/> */}
                </div>
            </div>
            <ProductCardContainer products={products} />
        </div>
        )
}

export default ProductListContainer