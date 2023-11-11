import { useState } from 'react'
import { getRequest } from '../api/basicRequest'

export const useProductList = () =>{
    const [products, setProducts] = useState([])

    async function loadProducts(){
        const res = await getRequest('/products/product/')
        setProducts(res.data.reverse())
    }

    return {products, loadProducts}
}