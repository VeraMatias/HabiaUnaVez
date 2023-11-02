import { useState } from 'react'
import { getRequest } from '../api/basicRequest'

export const useInstitutionContainer = () =>{
    const [institution, setInstitution] = useState([])
    const [modalCreate, setModalCreate] = useState(false)

    const toggleModalCreate = () => setModalCreate(!modalCreate)

    async function loadInstitution(){
        const res = await getRequest('/bags/institution/')
        let data = []

        for(let i = 0; i < res.data.length; i++){
            data.push({id: res.data[i].id, name: res.data[i].name, nameColumn1: 'Nombre', quantity: res.data[i].bag_quantity, nameColumn2: 'Bolsos', nameColumn3: '', nameColumn4: ''})
        }
        
        setInstitution(data)
    }

    return {institution, setInstitution, modalCreate, toggleModalCreate, loadInstitution}
}