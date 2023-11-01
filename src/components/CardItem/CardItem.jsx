import './CardItem.css'

import ModalUpdateCreate from '../Modal/ModalUpdate/ModalUpdateCreate'
import ModalDelete from '../Modal/ModalDelete/ModalDelete'
import { useCardItem } from '../../hooks/useCardItem'
import CardColumn from './CardColumn/CardColumn'

const CardItem = ({item, name, nameColumn1, quantity, nameColumn2, url}) => {

    const {modalUpdate,modalDelete,toggleModalUpdate,toggleModalDelete} = useCardItem()

    return(
        <>
        <ModalUpdateCreate show={modalUpdate} close={toggleModalUpdate} item={item} update={true} url={url} title={'Institución'}/>
        <ModalDelete show={modalDelete} close={toggleModalDelete} item={item} title={'Institución'} url={url}/>
        <div className="card-item">
            <CardColumn className={'item-column large'} name={name} nameColumn={nameColumn1}/>
            <CardColumn className={'item-column'} name={quantity} nameColumn={nameColumn2 }/>

            <div className="item-buttons">
                <i className='bx bx-pencil' onClick = {toggleModalUpdate}></i>
                <i className='bx bxs-trash' onClick = {toggleModalDelete}></i>
            </div>
        </div>       
        </>
    )
}

export default CardItem