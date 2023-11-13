import './DropdownList.css'

import { useState } from 'react'

const DropdownList = ({items, title, handleClick}) =>{
    const [showMenu, setShowMenu] = useState(false)
    const toggleShowMenu = () =>{setShowMenu(!showMenu)}

    return(
        <li className='dropdown-container'>
            <div className="title-dropdown-container" onClick={() => toggleShowMenu()}>
                <a href='#'>
                    <span className="title-dropdown">{title}</span>
                </a>
                <i className = {showMenu ? 'bx bx-chevron-down rotate': 'bx bx-chevron-down'}></i>
            </div>
            <ul className={showMenu ? "submenu-dropdown" : 'ocult'}>
                {items.map(submenu =>(<li key = {submenu} className='submenu-item' onClick ={() => {handleClick(submenu); toggleShowMenu()}}>{submenu}</li>))}
            </ul>
        </li>
    )
}

export default DropdownList