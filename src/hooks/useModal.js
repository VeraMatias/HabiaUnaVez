import { useState } from 'react'
import { deleteRequest, updateRequest, createRequest} from '../api/basicRequest'

export const useModal = (item, url, update) =>{
    
    function  handleDelete() {
        deleteRequest(url + item.id + '/' )
        window.location.reload()
    }
    
    const [data, setData]  =useState({name: item.name})

    const handleInput = (e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }

    function  handleSubmit() {
        update ?
        updateRequest(url + item.id + '/', {name: data.name})
        :
        createRequest(url, {name: data.name})
    }
    
    return {handleDelete, data, handleInput, handleSubmit}
}