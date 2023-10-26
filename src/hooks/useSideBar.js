import { useState } from 'react'

export const useSideBar = () =>{
    const data_categories = [
        {id: 1, name: 'Productos', icon: 'bx bxs-t-shirt', sub_menus: ['Listar', 'Crear', 'Modificar', 'Eliminar']},
        {id: 2, name: 'Bolsos', icon: 'bx bx-shopping-bag', sub_menus: ['Listar', 'Crear', 'Modificar', 'Eliminar', 'Visor']},
        {id: 3, name: 'Proveedores', icon: 'bx bx-store', sub_menus: ['Listar', 'Crear', 'Modificar', 'Eliminar']},
    ]

    const [showItems, setShowItems] = useState({})
    const [showSideBar, setShowSideBar] = useState(true)

    const toggleShowItems = (itemId) =>{
        setShowItems((prevShowItems) =>({
            ...prevShowItems,
            [itemId]: !prevShowItems[itemId]
        }))
    }

    const toggleShowSideBar = () =>{
        setShowSideBar(!showSideBar)
    }

    return {data_categories, showItems, showSideBar, toggleShowItems, toggleShowSideBar}
}