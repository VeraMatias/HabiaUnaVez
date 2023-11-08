import './CategoryContainer.css'

import { useEffect} from 'react'

import CardItem from '../components/CardItem/CardItem'
import ButtonNew from '../components/General/ButtonNew/ButtonNew'
import { useCategoryContainer } from '../hooks/useCategoryContainer'
import ModalContainer from './ModalContainer'
import GenericUpdate from '../components/Modal/ModalUpdate/GenericUpdate'
import GenericCreate from '../components/Modal/ModalCreate/GenericCreate'


const CategoryContainer = () =>{

    const {category, modalCreate, toggleModalCreate, loadCategory} = useCategoryContainer()

    useEffect(() =>{loadCategory();},[])

    return(
        <>
        <ModalContainer show={modalCreate} close={toggleModalCreate} title={'Crear Categoría'} modalContent={<GenericCreate item={''} url={'/products/category_product/'}/>}/>
        <div className="container-category">
            <div className="category-header">
                <h2 className='header-title'>CATEGORIAS</h2>
                <div className="header-buttons">
                    <ButtonNew onClick ={toggleModalCreate}/>
                </div>
            </div>
            {category.map( category =>(<CardItem key={category.id} item={category} url={'/products/category_product/'} title={'Categoría'} modalContent={<GenericUpdate item={category} url={'/products/category_product/'}/>}/>))}
        </div>
        </>
    )
}

export default CategoryContainer