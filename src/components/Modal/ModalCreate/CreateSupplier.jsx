import './CreateSupplier.css'

import { useModal } from '../../../hooks/useModal'

const CreateSupplier = ({item, url}) => {

    const {handleInput, handleCreate} = useModal(item, url)

    return(
        <div className="modal-content">
            <p>Ingrese los datos a continuación:</p>
            <form onSubmit={handleCreate} id='form-submit'> 
                <label>Nombre</label>
                <input type='text' name='name' onChange={handleInput} maxLength={'50'} className='input-name'></input>
                <label>Pagina WEB</label>
                <input type='url' name='url' onChange={handleInput} maxLength={'50'} className='input-name'></input>
                <label>Talla</label>
                <div className="input-select">
                    <select name="armhole" onChange={handleInput} id="armhole" form="form-submit">
                        <option value="Chica">Chica</option>
                        <option value="Normal">Normal</option>
                        <option value="Grande">Grande</option>
                    </select>
                </div>
            </form>
        </div> 
    )
}

export default CreateSupplier