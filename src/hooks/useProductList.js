import { useState } from 'react'
import { getRequest } from '../api/basicRequest'

export const useProductList = () =>{
    const [products, setProducts] = useState([])
    const [productsToShow, setProductsToShow] = useState([])
    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])

    async function loadProducts(setNextCode = null){
        const res = await getRequest('/products/product/')
        setProducts(res.data.slice().reverse())
        setProductsToShow(res.data.slice().reverse())
        setCategories(['Todas', ...new Set(res.data.map(product => product.category_product))])
        setSuppliers(['Todos', ...new Set(res.data.map(product => product.supplier))])
        if (setNextCode !== null){ setNextCode(parseInt(res.data.reverse().slice(0,1)[0].code + 1))}
    }

    const filterCategory = (category) => {
        if (category === 'Todas') {
            setProductsToShow(products)
        }else{
            setProductsToShow(products.filter(product => product.category_product === category))
        }
    }

    const filterSupplier = (supplier) => {
        if (supplier === 'Todos') {
            setProductsToShow(products)
        }else{
            setProductsToShow(products.filter(product => product.supplier === supplier))
        }
    }

    const filterProduct = (e) => { setProductsToShow(products.filter(product => String(product.code).startsWith(e.target.value)))}

    return { productsToShow, products, loadProducts, categories, filterCategory, suppliers, filterSupplier, filterProduct}}
