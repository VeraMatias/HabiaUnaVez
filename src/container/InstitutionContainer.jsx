import './InstitutionContainer.css'

import { useEffect} from 'react'

import CardItem from '../components/CardItem/CardItem'
import ModalUpdateCreate from '../components/Modal/ModalUpdate/ModalUpdateCreate'
import { useInstitutionContainer } from '../hooks/useInstitutionContainer'
import ButtonNew from '../components/General/ButtonNew/ButtonNew'


const InstitutionContainter = () =>{

    const {institution, modalCreate, toggleModalCreate, loadInstitution} = useInstitutionContainer()

    useEffect(() =>{loadInstitution();},[])

    return(
        <>
        <ModalUpdateCreate show={modalCreate} close={toggleModalCreate} item={''} update={false} url={'/bags/institution/'} title={'Institución'}/>
        <div className="container-institutions">
            <div className="institution-header">
                <h2 className='header-title'>INSTITUCIONES</h2>
                <div className="header-buttons">
                    <ButtonNew onClick ={toggleModalCreate}/>
                </div>
            </div>
            {institution.map( institution =>(
                    <CardItem key={institution.id} institution={institution} name={institution.name} nameColumn1={'Nombre'} quantity={institution.bag_quantity} nameColumn2={'Bolsos'}/>
                ))
            }
        </div>
        </>
    )
}

export default InstitutionContainter