import { useEffect, useState } from 'react'
import './InputSelect.css'


const InputSelect = ({label, name, onChange, data}) => {

    const [storedValue, setStoredValue] = useState('')
    const [storedIDValue, setStoredIDValue] = useState('')

    const handleSelect = (e) =>{
        const selectedValue = e.target.options[e.target.selectedIndex].dataset.name;
        const selectedIDValue = e.target.value;
        if (name === 'supplier') {
            localStorage.setItem(name, selectedValue);
            localStorage.setItem(name + '_id', selectedIDValue);
        }
        setStoredValue(selectedValue);
        setStoredValue(selectedIDValue);
        onChange(e)
    }

    useEffect(() =>{
        setStoredValue(localStorage.getItem(name))
        setStoredIDValue(localStorage.getItem(name + '_id'))
        if (name === 'supplier') {onChange({ target: { name: name, value: storedIDValue } });
    }},[storedValue])

    return(
        <>
        <label>{label}</label>
        <div className="input-select">
            <select name={name} onChange={handleSelect} id={name} form="form-submit" defaultValue={''} >
                <option value='' disabled >{storedValue? storedValue : 'Seleccione una Opción'}</option>
                {data.map( option => <option key={option.name} data-name={option.name} value={option.id}> {option.name} </option>)}
            </select>
        </div>
        </>
    )
}

export default InputSelect