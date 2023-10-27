import './InstitutionContainer.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRequest } from '../api/getRequest'
import CardInstitution from '../components/CardInstitution/CardInstitution'

const InstitutionContainter = () =>{

    const [institution, setInstitution] = useState([])

    useEffect(() =>{
        async function loadInstitution(){
            const res = await getRequest('http://localhost:8000/bags/institution/')
            setInstitution(res.data)
        }
        loadInstitution();
    },[])

    return(
        <div className="container-institutions">
            <div className="institution-header">
                <h2 className='header-title'>INSTITUCIONES</h2>
                <div className="header-buttons">
                    <Link className= 'header-button'>
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
    )
}

export default InstitutionContainter