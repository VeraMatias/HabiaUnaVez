import './GenericUpdate.css'

import { useModal } from '../../../hooks/useModal'
import Input from '../../General/Input/Input'

const GenericUpdate = ({item, url}) => {

    const {data, handleInput, handleUpdate} = useModal(item, url)

    return(
        <div className="modal-content">
            <p>Ingrese los datos a continuación:</p>
            <form onSubmit={handleUpdate} id='form-submit'> 
                <Input label={'Nombre'} type={'text'} name={'name'} handleInput={handleInput} maxLength={'50'} value={data.name}/>
            </form>
        </div>
    )
}

export default GenericUpdate