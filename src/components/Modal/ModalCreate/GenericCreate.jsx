import './GenericCreate.css'

import { useModal } from '../../../hooks/useModal'
import Input  from '../../General/Input/Input'

const GenericCreate = ({item, url}) => {

    const {handleInput, handleCreate} = useModal(item, url)

    return(
        <div className="modal-content">
            <p>Ingrese los datos a continuación:</p>
            <form onSubmit={handleCreate} id='form-submit'> 
                <Input label={'Nombre'} type={'text'} name={'name'} handleInput={handleInput} maxLength={'50'}/>
            </form>
        </div>
    )
}

export default GenericCreate