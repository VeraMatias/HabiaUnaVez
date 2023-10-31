import { useState } from 'react'
import { deleteRequest, updateRequest, createRequest} from '../api/basicRequest'

export const useModal = (item, url, update) =>{
    // UPDATE
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

    // DELETE
    function  handleDelete() {
        deleteRequest(url + item.id + '/' )
        window.location.reload()
    }
    
    return {handleDelete, data, handleInput, handleSubmit}
}