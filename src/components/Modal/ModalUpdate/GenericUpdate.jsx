import './GenericUpdate.css'

import { useModal } from '../../../hooks/useModal'

const GenericUpdate = ({item, url}) => {

    const {data, handleInput, handleUpdate} = useModal(item, url)

    return(
        <div className="modal-content">
            <p>Ingrese los datos a continuación:</p>
            <form onSubmit={handleUpdate} id='form-submit'> 
                <label>Nombre</label>
                <input type='text' name='name' onChange={handleInput} maxLength={'50'} className='input-name' value={data.name}></input>
            </form>
        </div>
    )
}

export default GenericUpdate