import './SupplierContainer.css'

import { useEffect} from 'react'

import CardItem from '../components/CardItem/CardItem'
import ButtonNew from '../components/General/ButtonNew/ButtonNew'
import { useSupplierContainer } from '../hooks/useSupplierContainer'
import ModalContainer from './ModalContainer'
import CreateSupplier from '../components/Modal/ModalCreate/CreateSupplier'
import UpdateSupplier from '../components/Modal/ModalUpdate/UpdateSupplier'


const SupplierContainer = () =>{

    const {supplier, modalCreate, toggleModalCreate, loadSupplier} = useSupplierContainer()

    useEffect(() =>{loadSupplier();},[])

    return(
        <>
        <ModalContainer show={modalCreate} close={toggleModalCreate} title={'Crear Proveedor'} modalContent={<CreateSupplier item={''} url={'/products/supplier/'}/>}/>
        <div className="container-category">
            <div className="category-header">
                <h2 className='header-title'>PROVEEDORES</h2>
                <ButtonNew onClick ={toggleModalCreate}/>
            </div>

            {supplier.map( supplier =>(<CardItem key={supplier.id} item={supplier} url={'/products/supplier/'} title={'Proveedor'} modalContent={<UpdateSupplier item={supplier} url={'/products/supplier/'}/>}/>))}
        </div>
        </>
    )
}

export default SupplierContainer