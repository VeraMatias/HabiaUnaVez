import { useState } from 'react'
import { createWithFileRequest} from '../api/basicRequest'

export const useProductCreate = (url) =>{
    const [data, setData]  =useState({})
    const [errorCode, setErrorCode] = useState(false)

    let form_data = new FormData()

    const handleInput = (e) =>{
        console.log(data)
        if(e.target.name === 'image'){
            setData({...data, [e.target.name]: e.target.files[0]})
        }else if(e.target.name === 'code'){
            if (/^\d{6}$/.test(e.target.value)) {
                setErrorCode(false)
                setData({...data, [e.target.name]: e.target.value})
            } else {
                setErrorCode(true)
                setData({...data, [e.target.name]: undefined})
            }
        } else if(e.target.name === 'cost'){
            const costValue = e.target.value;
            setData((prevData) => ({
                ...prevData,
                cost: costValue,
                price: Math.round(costValue * 2.20),
            }));
        } else{
        setData({...data, [e.target.name]: e.target.value})
        }
    }

    const handleOnBlur = (nextCode) =>{setData({...data, code: nextCode})
    }

    function createFormData(){
        form_data.append('code', parseInt(data.code))
        form_data.append('quantity', parseInt(data.quantity))
        form_data.append('cost', parseInt(data.cost))
        form_data.append('price', parseInt(data.price))
        form_data.append('description', data.description)
        form_data.append('category_product', parseInt(data.category))
        form_data.append('supplier', parseInt(data.supplier))
        if (data.image !== undefined)
        {
            form_data.append('image', data.image, `${data.code}.jpg`)
        }else{
            form_data.append('image', '')
        }
    }

    function  handleCreateWithFile() { 
        createFormData()
        createWithFileRequest(url, form_data) 
    }
    
    return {data, handleInput, handleOnBlur, handleCreateWithFile, errorCode}
}