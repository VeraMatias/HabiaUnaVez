import { useState } from 'react'
import { deleteRequest, updateRequest, createRequest} from '../api/basicRequest'

export const useModal = (item, url) =>{
    const { id, nameColumn1, nameColumn2, nameColumn3, nameColumn4, quantity, ...dataFilter } = item;
    const [data, setData]  =useState({...dataFilter})


    const handleInput = (e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }

    function  handleUpdate() { updateRequest(url + item.id + '/', data) }

    function  handleCreate() { createRequest(url, data) }

    function  handleDelete() {
        deleteRequest(url + item.id + '/' )
        window.location.reload()
    }
    
    return {data, handleInput, handleCreate, handleUpdate, handleDelete}
}