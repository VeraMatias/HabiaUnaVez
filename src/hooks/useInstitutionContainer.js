import { useState } from 'react'
import { getRequest } from '../api/basicRequest'

export const useInstitutionContainer = () =>{
    const [institution, setInstitution] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const toggleModalCreate = () => setModalCreate(!modalCreate)

    async function loadInstitution(){
        const res = await getRequest('/bags/institution/')
        setInstitution(res.data)
    }

    return {institution, setInstitution, modalCreate, toggleModalCreate, loadInstitution}
}