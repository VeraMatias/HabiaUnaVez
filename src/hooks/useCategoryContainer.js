import { useState } from 'react'
import { getRequest } from '../api/basicRequest'

export const useCategoryContainer = () =>{
    const [category, setCategory] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const toggleModalCreate = () => setModalCreate(!modalCreate)

    async function loadCategory(){
        const res = await getRequest('/products/category_product/')
        let data = []

        for(let i = 0; i < res.data.length; i++){
            data.push({id: res.data[i].id, name: res.data[i].name, nameColumn1: 'Nombre', quantity: res.data[i].product_quantity, nameColumn2: 'Productos', nameColumn3: '', nameColumn4: ''})
        }
        setCategory(data)
    }

    return {category, setCategory, modalCreate, toggleModalCreate, loadCategory}
}