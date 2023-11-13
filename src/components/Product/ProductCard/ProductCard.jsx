import './ProductCard.css'
import  noImage  from '../../../assets/producto-sin-imagen.png'

const ProductCard = ({product}) => {
    const baseURL = process.env.REACT_APP_BASE_URL

    return(
        <div className="product-card">
            <div className="product-info">
                <p className="info-code">{product.code}</p>
                <p className="info-description">{product.description === 'undefined' ? <br/>: product.description}</p>
                <img src= {product.image ? baseURL + product.image : noImage} alt="Imagen de producto" className='product-img'/>
                <div className='cost-price'>
                    <div>
                        <p>Costo</p>
                        <p className="info-cost">${product.cost}</p>
                    </div>
                    <div>
                        <p>Precio</p>
                        <p className="info-price">${product.price}</p>
                    </div>
                </div>
                <p className="info-category_product">{product.category_product}</p>
                <p className="info-supplier">{product.supplier}</p>
            </div>
        </div>
    )
}

export default ProductCard