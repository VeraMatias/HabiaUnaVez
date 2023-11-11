import { useState } from 'react'

export const useSideBar = () =>{
    const data_categories = [
        {id: 1, 
        name: 'Productos', 
        icon: 'bx bxs-t-shirt', 
        sub_menus: [
            {name: 'Listar', url: 'product/list'},
            {name: 'Crear', url: 'product/create'},
            {name: 'Modificar', url: 'product/update'},
            {name: 'Eliminar', url: 'product/delete'},
        ]},
        {id: 2, 
        name: 'Bolsos', 
        icon: 'bx bx-shopping-bag', 
        sub_menus: [
            {name: 'Listar', url: 'bag/list'},
            {name: 'Crear', url: 'bag/create'},
            {name: 'Modificar', url: 'bag/update'},
            {name: 'Eliminar', url: 'bag/delete'},
            {name: 'Visor', url: 'bag/view'},
        ]},
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