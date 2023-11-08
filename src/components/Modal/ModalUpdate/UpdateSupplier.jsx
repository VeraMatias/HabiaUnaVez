import './UpdateSupplier.css'

import { useModal } from '../../../hooks/useModal'

const UpdateSupplier = ({item, url}) => {

    const {data, handleInput, handleUpdate} = useModal(item, url)

    return(
        <div className="modal-content">
            <p>Ingrese los datos a continuación:</p>
            <form onSubmit={handleUpdate} id='form-submit'> 
                <label>Nombre</label>
                <input type='text' name='name' onChange={handleInput} maxLength={'50'} className='input-name' value={data.name}></input>
                <label>Pagina WEB</label>
                <input type='url' name='url' onChange={handleInput} maxLength={'50'} className='input-name' value={data.url}></input>
                <label>Talla</label>
                <div className="input-select">
                    <select name="armhole" onChange={handleInput} id="armhole" form="form-submit" value={data.armhole}>
                        <option value="Chica">Chica</option>
                        <option value="Normal">Normal</option>
                        <option value="Grande">Grande</option>
                    </select>
                </div>
            </form>
        </div> 
    )
}

export default UpdateSupplier