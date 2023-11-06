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
            {institution.map( institution =>(<CardItem key={institution.id} item={institution} url={'/bags/institution/'} title={'Institución'}/>))}
        </div>
        </>
    )
}

export default InstitutionContainter