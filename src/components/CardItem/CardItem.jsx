import './CardItem.css'

import ModalUpdateCreate from '../Modal/ModalUpdate/ModalUpdateCreate'
import ModalDelete from '../Modal/ModalDelete/ModalDelete'
import { useCardItem } from '../../hooks/useCardItem'
import CardColumn from './CardColumn/CardColumn'

const CardItem = ({item, url}) => {

    const {modalUpdate,modalDelete,toggleModalUpdate,toggleModalDelete} = useCardItem()

    return(
        <>
        <ModalUpdateCreate show={modalUpdate} close={toggleModalUpdate} item={item} update={true} url={url} title={'Institución'}/>
        <ModalDelete show={modalDelete} close={toggleModalDelete} item={item} title={'Institución'} url={url}/>
        <div className="card-item">
            {item.nameColumn1 ? <CardColumn className={'item-column large'} name={item.name} nameColumn={item.nameColumn1}/>:null}
            {item.nameColumn2 ? <CardColumn className={'item-column'} name={item.quantity} nameColumn={item.nameColumn2 }/>:null}
            {item.nameColumn3 ? <CardColumn className={'item-column'} name={item.url} nameColumn={item.nameColumn3 }/>:null}
            {item.nameColumn4 ? <CardColumn className={'item-column'} name={item.armhole} nameColumn={item.nameColumn4 }/>:null}

            <div className="item-buttons">
                <i className='bx bx-pencil' onClick = {toggleModalUpdate}></i>
                <i className='bx bxs-trash' onClick = {toggleModalDelete}></i>
            </div>
        </div>       
        </>
    )
}

export default CardItem