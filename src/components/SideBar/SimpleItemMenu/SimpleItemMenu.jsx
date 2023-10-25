import { Link } from 'react-router-dom'

const SimpleItemMenu = ({icon, name}) =>{
    return(
    <li>
        <Link>
            <i className={icon} ></i>
            <span className="link-name">{name}</span>
        </Link>
        <ul className="sub-menu blank">
            <li><Link className='submenu-link-name'>{name}</Link></li>
        </ul>
    </li>
    )
}

export default SimpleItemMenu