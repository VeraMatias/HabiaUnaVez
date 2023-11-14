import { useState } from 'react'
import { deleteRequest, updateRequest, createRequest, createWithFileRequest} from '../api/basicRequest'

export const useModal = (item, url) =>{
    const { id, nameColumn1, nameColumn2, nameColumn3, nameColumn4, quantity, ...dataFilter } = item;
    const [data, setData]  =useState({...dataFilter})
    let form_data = new FormData()

    const handleInput = (e) =>{
        if(e.target.name === 'image'){
            setData({...data, [e.target.name]: e.target.files[0]})
        }else{
        setData({...data, [e.target.name]: e.target.value})
        }
        console.log(data)
    }

    function createFormData(){
        form_data.append('code', data.code)
        form_data.append('quantity', data.quantity)
        form_data.append('cost', data.cost)
        form_data.append('price', data.price)
        form_data.append('description', data.description)
        form_data.append('category_product', data.category_product)
        form_data.append('supplier', data.supplier)
        form_data.append('image', data.image, data.image.name)
    }

    function  handleUpdate() { updateRequest(url + item.id + '/', data) }

    function  handleCreate() { createRequest(url, data)  }
    function  handleCreateWithFile() { 
        createFormData()
        createWithFileRequest(url, form_data) 
    }

    function  handleDelete() {
        deleteRequest(url + item.id + '/' )
        window.location.reload()
    }
    
    return {data, handleInput, handleCreate, handleCreateWithFile, handleUpdate, handleDelete}
}