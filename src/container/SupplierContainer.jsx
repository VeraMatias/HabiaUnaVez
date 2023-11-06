import './SupplierContainer.css'

import { useEffect} from 'react'

import CardItem from '../components/CardItem/CardItem'
import ModalUpdateCreate from '../components/Modal/ModalUpdate/ModalUpdateCreate'
import ButtonNew from '../components/General/ButtonNew/ButtonNew'
import { useSupplierContainer } from '../hooks/useSupplierContainer'


const SupplierContainer = () =>{

    const {supplier, modalCreate, toggleModalCreate, loadSupplier} = useSupplierContainer()

    useEffect(() =>{loadSupplier();},[])

    return(
        <>
        <ModalUpdateCreate show={modalCreate} close={toggleModalCreate} item={''} update={false} url={'/products/supplier/'} title={'Proveedor'}/>
        <div className="container-category">
            <div className="category-header">
                <h2 className='header-title'>Proveedores</h2>
                <div className="header-buttons">
                    <ButtonNew onClick ={toggleModalCreate}/>
                </div>
            </div>

            {supplier.map( supplier =>(<CardItem key={supplier.id} item={supplier} url={'/products/supplier/'} title={'Proveedor'}/>))}
        </div>
        </>
    )
}

export default SupplierContainer