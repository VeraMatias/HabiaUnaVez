import './CategoryContainer.css'

import { useEffect} from 'react'

import CardItem from '../components/CardItem/CardItem'
import ModalUpdateCreate from '../components/Modal/ModalUpdate/ModalUpdateCreate'
import ButtonNew from '../components/General/ButtonNew/ButtonNew'
import { useCategoryContainer } from '../hooks/useCategoryContainer'


const CategoryContainer = () =>{

    const {category, modalCreate, toggleModalCreate, loadCategory} = useCategoryContainer()

    useEffect(() =>{loadCategory();},[])

    return(
        <>
        <ModalUpdateCreate show={modalCreate} close={toggleModalCreate} item={''} update={false} url={'/products/category_product/'} title={'Categoría'}/>
        <div className="container-category">
            <div className="category-header">
                <h2 className='header-title'>CATEGORIAS</h2>
                <div className="header-buttons">
                    <ButtonNew onClick ={toggleModalCreate}/>
                </div>
            </div>
            {category.map( category =>(
                    <CardItem key={category.id} item={category} url={'/products/category_product/'} title={'Categoría'}/>
                ))
            }
        </div>
        </>
    )
}

export default CategoryContainer