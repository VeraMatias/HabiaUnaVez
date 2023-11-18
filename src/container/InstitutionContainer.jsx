import './InstitutionContainer.css'

import { useEffect} from 'react'

import CardItem from '../components/CardItem/CardItem'
import { useInstitutionContainer } from '../hooks/useInstitutionContainer'
import ButtonNew from '../components/General/ButtonNew/ButtonNew'
import ModalContainer from './ModalContainer'
import GenericUpdate from '../components/Modal/ModalUpdate/GenericUpdate'
import GenericCreate from '../components/Modal/ModalCreate/GenericCreate'

const InstitutionContainter = () =>{

    const {institution, modalCreate, toggleModalCreate, loadInstitution} = useInstitutionContainer()

    useEffect(() =>{loadInstitution();},[])

    return(
        <>
        <ModalContainer show={modalCreate} close={toggleModalCreate} title={'Crear Institución'} modalContent={<GenericCreate item={''} url={'/bags/institution/'}/>}/>
        <div className="container-institutions">
            <div className="institution-header">
                <h2 className='header-title'>INSTITUCIONES</h2>
                <ButtonNew onClick ={toggleModalCreate}/>
            </div>
            {institution.map( institution =>(<CardItem key={institution.id} item={institution} url={'/bags/institution/'} title={'Institución'} modalContent={<GenericUpdate item={institution} url={'/bags/institution/'}/>}/>))}
        </div>
        </>
    )
}

export default InstitutionContainter