import './SideBar.css'

import { Link } from 'react-router-dom'
import { useSideBar } from '../../../hooks/useSideBar'
import ItemMenu from '../ItemMenu/ItemMenu'
import SimpleItemMenu from '../SimpleItemMenu/SimpleItemMenu'

const SideBar = () =>{

    const {data_categories, showSideBar, toggleShowSideBar} = useSideBar()

    return(
        <>
        <div className= {showSideBar ? 'sidebar' : 'sidebar close'}>
            <div className="menu-details">
                <i class='bx bx-menu' onClick={() => toggleShowSideBar()}></i>
                <span className="menu-name">Menu</span>
            </div>

            <ul className="nav-links">
                <SimpleItemMenu icon = 'bx bxs-dashboard' name = 'Dashboard'/>
                {data_categories.map(item => (<ItemMenu item={item}/>))}
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