import { useState } from 'react'
import { getRequest } from '../api/basicRequest'

export const useSupplierContainer = () =>{
    const [supplier, setSupplier] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const toggleModalCreate = () => setModalCreate(!modalCreate)

    async function loadSupplier(){
        const res = await getRequest('/products/supplier/')
        let data = []

        for(let i = 0; i < res.data.length; i++){
            data.push(
                {id: res.data[i].id, 
                name: res.data[i].name, 
                nameColumn1: 'Nombre', 
                quantity: res.data[i].product_quantity, 
                nameColumn2: 'Productos', 
                url: res.data[i].url,
                nameColumn3: 'Web', 
                armhole: res.data[i].armhole,
                nameColumn4: 'Talla'})
        }
        setSupplier(data)
    }

    return {supplier, modalCreate, toggleModalCreate, loadSupplier}
}