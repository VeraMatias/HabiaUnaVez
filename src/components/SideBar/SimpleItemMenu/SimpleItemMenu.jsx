import { Link } from 'react-router-dom'

const SimpleItemMenu = ({icon, name, url}) =>{
    return(
    <li>
        <Link to = {url}>
            <i className={icon} ></i>
            <span className="link-name">{name}</span>
        </Link>
        <ul className="sub-menu blank">
            <li><Link to = {url} className='submenu-link-name'>{name}</Link></li>
        </ul>
    </li>
    )
}

export default SimpleItemMenu