import './InstitutionContainer.css'

import { useEffect} from 'react'
import { Link } from 'react-router-dom'
import CardInstitution from '../components/CardInstitution/CardInstitution'
import ModalUpdateCreate from '../components/Modal/ModalUpdate/ModalUpdateCreate'
import { useInstitutionContainer } from '../hooks/useInstitutionContainer'


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
                    <Link className= 'header-button' onClick = {toggleModalCreate}>
                        <i className='bx bx-plus'></i>
                        Nueva
                    </Link> 
                </div>
            </div>
            {institution.map( institution =>(
                    <CardInstitution key={institution.id} institution={institution}/>
                ))
            }
        </div>
        </>
    )
}

export default InstitutionContainter