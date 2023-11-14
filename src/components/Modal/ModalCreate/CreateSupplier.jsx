import './CreateSupplier.css'

import { useModal } from '../../../hooks/useModal'
import Input from '../../General/Input/Input'

const CreateSupplier = ({item, url}) => {

    const {handleInput, handleCreate} = useModal(item, url)

    return(
        <div className="modal-content">
            <p>Ingrese los datos a continuación:</p>
            <form onSubmit={handleCreate} id='form-submit'> 
                <Input label={'Nombre'} type={'text'} name={'name'} handleInput={handleInput} maxLength={'50'} />
                <Input label={'Pagina WEB'} type={'url'} name={'url'} handleInput={handleInput} maxLength={'50'}/>
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