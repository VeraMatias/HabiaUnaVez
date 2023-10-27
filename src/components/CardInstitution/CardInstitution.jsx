import './CardInstitution.css'
import { Link } from 'react-router-dom'

const CardInstitution = ({institution}) => {
    return(
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
    )
}

export default CardInstitution