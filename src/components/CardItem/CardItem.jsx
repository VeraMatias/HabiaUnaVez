import './CardItem.css'

import ModalDelete from '../Modal/ModalDelete/ModalDelete'
import { useCardItem } from '../../hooks/useCardItem'
import CardColumn from './CardColumn/CardColumn'
import ModalContainer from '../../container/ModalContainer'


const CardItem = ({item, url, title, modalContent}) => {

    const {modalUpdate,modalDelete,toggleModalUpdate,toggleModalDelete} = useCardItem()

    return(
        <>
        <ModalContainer show={modalUpdate} close={toggleModalUpdate} title={`Modificar ${title}`} modalContent={modalContent}/>
        <ModalDelete show={modalDelete} close={toggleModalDelete} item={item} title={title} url={url}/>
        <div className="card-item">
            {item.nameColumn1 ? <CardColumn className={'item-column large'} name={item.name} nameColumn={item.nameColumn1}/>:null}
            {item.nameColumn2 ? <CardColumn className={'item-column'} name={item.quantity} nameColumn={item.nameColumn2 }/>:null}
            {item.nameColumn4 ? <CardColumn className={'item-column armhole'} name={item.armhole} nameColumn={item.nameColumn4 }/>:null}

            <div className="item-buttons">
                {item.nameColumn3 ? <a href={item.url} target='blank'><i className='bx bx-world'></i></a>:null} 
                <i className='bx bx-pencil' onClick = {toggleModalUpdate}></i>
                <i className='bx bxs-trash' onClick = {toggleModalDelete}></i>
            </div>
        </div>       
        </>
    )
}

export default CardItem