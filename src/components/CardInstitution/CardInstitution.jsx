import './CardInstitution.css'

import ModalUpdateCreate from '../Modal/ModalUpdate/ModalUpdateCreate'
import ModalDelete from '../Modal/ModalDelete/ModalDelete'
import { useCardinstitution } from '../../hooks/useCardinstitution'

const CardInstitution = ({institution}) => {

    const {modalUpdate,modalDelete,toggleModalUpdate,toggleModalDelete} = useCardinstitution()

    return(
        <>
        <ModalUpdateCreate show={modalUpdate} close={toggleModalUpdate} item={institution} update={true} url={'/bags/institution/'} title={'Institución'}/>
        <ModalDelete show={modalDelete} close={toggleModalDelete} item={institution} title={'Institución'} url={'/bags/institution/'}/>
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