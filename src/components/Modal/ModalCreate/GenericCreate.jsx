import './GenericCreate.css'

import { useModal } from '../../../hooks/useModal'

const GenericCreate = ({item, url}) => {

    const {handleInput, handleCreate} = useModal(item, url)

    return(
        <div className="modal-content">
            <p>Ingrese los datos a continuación:</p>
            <form onSubmit={handleCreate} id='form-submit'> 
                <label>Nombre</label>
                <input type='text' name='name' onChange={handleInput} maxLength={'50'} className='input-name'></input>
            </form>
        </div>
    )
}

export default GenericCreate