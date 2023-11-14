import './Input.css'


const Input = ({label, type, name, handleInput, maxLength, value}) => {

    return(
        <>
        <label for ={name}>{label}</label>
        <input type= {type} name={name} id={name} onChange={handleInput} maxLength={maxLength} className='input-form' value={value}></input>
        </>

    )


}

export default Input