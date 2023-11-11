import { Link } from 'react-router-dom'
import { useSideBar } from '../../../hooks/useSideBar'

const ItemMenu = ({item}) =>{

    const {showItems, toggleShowItems} = useSideBar()
    
    return(
    <li className = {showItems[item.id] ? 'show-menu': ''}>
        <div className="icon-link" onClick={() => toggleShowItems(item.id)}>
            <a href='#'>
                <i className={item.icon}></i>
                <span className="link-name">{item.name}</span>
            </a>
            <i className = {showItems[item.id] ? 'bx bx-chevron-down rotate': 'bx bx-chevron-down'}></i>
        </div>
        <ul className="sub-menu">
            <li ><Link className='submenu-link-name'>{item.name}</Link></li>
            {
                item.sub_menus.map(submenu =>(
                    <li key = {item.name + submenu.name} ><Link to={submenu.url}>{submenu.name}</Link></li>
                ))
            }
        </ul>
    </li>
    )
}

export default ItemMenu