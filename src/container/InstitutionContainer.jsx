import './InstitutionContainer.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRequest } from '../api/basicRequest'
import CardInstitution from '../components/CardInstitution/CardInstitution'
import ModalUpdateCreate from '../components/Modal/ModalUpdate/ModalUpdateCreate'

const InstitutionContainter = () =>{

    const [institution, setInstitution] = useState([])
    const [modalCreate, setModalCreate] = useState(false)

    const toggleModalCreate = () => setModalCreate(!modalCreate)

    useEffect(() =>{
        async function loadInstitution(){
            const res = await getRequest('/bags/institution/')
            setInstitution(res.data)
        }
        loadInstitution();
    },[])

    return(
        <>
        <ModalUpdateCreate show={modalCreate} close={toggleModalCreate} institution={''} update={false}/>
        <div className="container-institutions">
            <div className="institution-header">
                <h2 className='header-title'>INSTITUCIONES</h2>
                <div className="header-buttons">
                    <Link className= 'header-button' onClick = {toggleModalCreate}>
                        <i className='bx bx-plus'></i>
                        Nueva
                    </Link> 
                </div>
            </div>
            {institution.map( institution =>(
                    <CardInstitution key={institution.id} institution={institution}/>
                ))
            }
        </div>
        </>
    )
}

export default InstitutionContainter