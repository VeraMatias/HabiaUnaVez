import { useState } from 'react'
import { getRequest } from '../api/basicRequest'

export const useCategoryContainer = () =>{
    const [category, setCategory] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const toggleModalCreate = () => setModalCreate(!modalCreate)

    async function loadCategory(){
        const res = await getRequest('/products/category_product/')
        setCategory(res.data)
    }

    return {category, setCategory, modalCreate, toggleModalCreate, loadCategory}
}