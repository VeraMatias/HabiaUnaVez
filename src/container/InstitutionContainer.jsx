import { Link } from 'react-router-dom'
import './InstitutionContainer.css'
import { useEffect, useState } from 'react'
import { getRequest } from '../api/getRequest'

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
            {
                institution.map( institution =>(
                    <div className="card-institution">
                        <div className="institution-name">
                            <h3>{institution.name}</h3>
                            <span>Nombre</span>
                        </div>
                        <div className="institution-bags">
                            <h3>{institution.bag_quantity}</h3>
                            <span>Bolsos</span>
                        </div>
                        <div className="institution-buttons">
                            <Link><i className='bx bx-pencil'></i></Link>
                            <Link><i className='bx bxs-trash'></i></Link>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default InstitutionContainter