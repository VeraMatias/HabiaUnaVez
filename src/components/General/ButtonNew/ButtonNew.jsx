import './ButtonNew.css'

import { Link } from 'react-router-dom'

const ButtonNew = ({onClick}) =>{
    return(
        <Link className= 'button-new' onClick = {onClick}>
            <i className='bx bx-plus'></i>
            Nueva
        </Link> 
    )
}

export default ButtonNew