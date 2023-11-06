import './SideBar.css'

import { useSideBar } from '../../../hooks/useSideBar'
import ItemMenu from '../ItemMenu/ItemMenu'
import SimpleItemMenu from '../SimpleItemMenu/SimpleItemMenu'

const SideBar = () =>{

    const {data_categories, showSideBar, toggleShowSideBar} = useSideBar()

    return(
        <div className= {showSideBar ? 'sidebar' : 'sidebar close'}>
            <div className="menu-details">
                <i className='bx bx-menu' onClick={() => toggleShowSideBar()}></i>
                <span className="menu-name">Menu</span>
            </div>

            <ul className="nav-links">
                <SimpleItemMenu icon = 'bx bxs-dashboard' name = 'Dashboard' url= '/'/>
                {data_categories.map(item => (<ItemMenu key={item.id} item={item}/>))}
                <SimpleItemMenu icon = 'bx bx-store' name = 'Proveedores' url = '/suppliers'/>
                <SimpleItemMenu icon = 'bx bx-buildings' name = 'Instituciones' url = '/institutions'/>
                <SimpleItemMenu icon = 'bx bx-food-menu' name = 'Categorías' url = '/categories'/>
            </ul>
        </div>
    )
}

export default SideBar