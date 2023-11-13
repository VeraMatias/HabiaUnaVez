import './ProductCardContainer.css'
import ProductCard from '../components/Product/ProductCard/ProductCard'

const ProductCardContainer = ({products}) => {
    return(
            <div className="container-product-card">
                { products.map(product =>(<ProductCard key={product.code} product={product}/>))}
            </div>
        )
}

export default ProductCardContainer