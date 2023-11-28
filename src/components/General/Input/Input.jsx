import './Input.css'


const Input = ({label, type, name, handleInput, handleOnBlur, maxLength, value}) => {

    return(
        <>
        <label htmlFor ={name}>{label}</label>
        <input type= {type} name={name} id={name} onChange={handleInput} onBlur={handleOnBlur} maxLength={maxLength} value={value} className='input-form'></input>
        </>

    )


}

export default Input