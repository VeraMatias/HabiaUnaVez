import { useState } from 'react'

export const useCardinstitution = () =>{
    const [modalUpdate, setModalUpdate] = useState(false)
    const [modalDelete, setModalDelete] = useState (false)

    const toggleModalUpdate = () => setModalUpdate(!modalUpdate)
    const toggleModalDelete = () => setModalDelete(!modalDelete)

    return {modalUpdate,modalDelete,toggleModalUpdate,toggleModalDelete}
}