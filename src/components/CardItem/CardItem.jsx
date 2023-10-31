import './CardItem.css'

import ModalUpdateCreate from '../Modal/ModalUpdate/ModalUpdateCreate'
import ModalDelete from '../Modal/ModalDelete/ModalDelete'
import { useCardItem } from '../../hooks/useCardItem'

const CardItem = ({institution, name, nameColumn1, quantity, nameColumn2}) => {

    const {modalUpdate,modalDelete,toggleModalUpdate,toggleModalDelete} = useCardItem()

    return(
        <>
        <ModalUpdateCreate show={modalUpdate} close={toggleModalUpdate} item={institution} update={true} url={'/bags/institution/'} title={'Institución'}/>
        <ModalDelete show={modalDelete} close={toggleModalDelete} item={institution} title={'Institución'} url={'/bags/institution/'}/>
        <div className="card-item">
            <div className="item-name">
                <h3>{name}</h3>
                <span>{nameColumn1}</span>
            </div>
            <div className="item-quantity">
                <h3>{quantity}</h3>
                <span>{nameColumn2}</span>
            </div>
            <div className="item-buttons">
                <i className='bx bx-pencil' onClick = {toggleModalUpdate}></i>
                <i className='bx bxs-trash' onClick = {toggleModalDelete}></i>
            </div>
        </div>       
        </>
    )
}

export default CardItem