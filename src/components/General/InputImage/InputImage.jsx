import './InputImage.css'


const InputImage = ({label, onChange}) => {

    return(
    <div className="container-input-image">
        <div className='input-image-selection'>
            <label>{label}</label>
            <input type='file' accept="image/*" name='image' onChange={onChange} maxLength={'1'} className='input-image'></input>
        </div>
    </div>
    )
}

export default InputImage