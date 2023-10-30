import { useState } from 'react'
import './CardInstitution.css'

import ModalUpdateCreate from '../Modal/ModalUpdate/ModalUpdateCreate'
import ModalDelete from '../Modal/ModalDelete/ModalDelete'

const CardInstitution = ({institution}) => {

    const [modalUpdate, setModalUpdate] = useState(false)
    const [modalDelete, setModalDelete] = useState (false)

    const toggleModalUpdate = () => setModalUpdate(!modalUpdate)
    const toggleModalDelete = () => setModalDelete(!modalDelete)

    return(
        <>
        <ModalUpdateCreate show={modalUpdate} close={toggleModalUpdate} institution={institution} update={true}/>
        <ModalDelete show={modalDelete} close={toggleModalDelete} item={institution} title={'Institución'}/>
        <div className="card-institution">
            <div className="institution-name">
                <h3>{institution.name}</h3>
                <span>Nombre</span>
            </div>
            <div className="institution-bags">
                <h3>{institution.bag_quantity}</h3>
                <span>Bolsos</span>
            </div>
            <div className="institution-buttons">
                <i className='bx bx-pencil' onClick = {toggleModalUpdate}></i>
                <i className='bx bxs-trash' onClick = {toggleModalDelete}></i>
            </div>
        </div>       
        </>
    )
}

export default CardInstitution