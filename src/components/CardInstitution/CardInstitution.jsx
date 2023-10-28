import { useState } from 'react'
import './CardInstitution.css'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal';

const CardInstitution = ({institution}) => {

    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState (false)

    const toggleModalUpdate = () => setModalUpdate(!modalUpdate)
    const toggleModalDelete = () => setModalDelete(!modalDelete)

    return(
        <>
        <Modal show={modalUpdate} close={toggleModalUpdate} title={'Modificar Institución'} institution={institution} update = {true}/>
        <Modal show={modalDelete} close={toggleModalDelete} title={'Eliminar Institución'} institution={institution} update = {false}/>         
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
                <i className='bx bx-pencil' onClick = {() => toggleModalUpdate('Modificar')}></i>
                <i className='bx bxs-trash' onClick = {() => toggleModalDelete('Eliminar')}></i>
            </div>
        </div>       
        </>
    )
}

export default CardInstitution