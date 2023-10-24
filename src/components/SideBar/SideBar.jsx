import './SideBar.css'

import { Link } from 'react-router-dom'
import { useSideBar } from '../../hooks/useSideBar'

const SideBar = () =>{

    const {data_categories, showItems, showSideBar, toggleShowItems, toggleShowSideBar} = useSideBar()

    return(
        <>
        <div className= {showSideBar ? 'sidebar' : 'sidebar close'}>
            <div className="menu-details">
            <i class='bx bx-menu' onClick={() => toggleShowSideBar()}></i>
                <span className="menu-name">Menu</span>
            </div>

            <ul className="nav-links">
                <li>
                    <Link>
                        <i className='bx bxs-dashboard' ></i>
                        <span className="link-name">Dashboard</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className='submenu-link-name'>Dashboard</Link></li>
                    </ul>
                </li>
                {data_categories.map(item => (
                    <li key = {item.id} className = {showItems[item.id] ? 'show-menu': ''}>
                    <div className="icon-link" onClick={() => toggleShowItems(item.id)}>
                        <a href='#'>
                            <i className={item.icon}></i>
                            <span className="link-name">{item.name}</span>
                        </a>
                        <i className = {showItems[item.id] ? 'bx bx-chevron-down rotate': 'bx bx-chevron-down'}></i>
                    </div>
                    <ul className="sub-menu">
                        <li><Link className='submenu-link-name'>{item.name}</Link></li>
                        {
                            item.sub_menus.map(submenu =>(
                                <li><Link>{submenu}</Link></li>
                            ))
                        }
                    </ul>
                </li>
                ))}
            </ul>
        </div>
        <section className="home-section">
            <Link to={'/'}>
                <h1 className="title">Había Una Vez</h1>
            </Link>
        </section>
        </>
    )
}

export default SideBar