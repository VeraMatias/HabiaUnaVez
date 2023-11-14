import './UpdateSupplier.css'

import { useModal } from '../../../hooks/useModal'
import Input from '../../General/Input/Input'

const UpdateSupplier = ({item, url}) => {

    const {data, handleInput, handleUpdate} = useModal(item, url)

    return(
        <div className="modal-content">
            <p>Ingrese los datos a continuación:</p>
            <form onSubmit={handleUpdate} id='form-submit'> 
                <Input label={'Nombre'} type={'text'} name={'name'} handleInput={handleInput} maxLength={'50'} value={data.name}/>
                <Input label={'Pagina WEB'} type={'url'} name={'url'} handleInput={handleInput} maxLength={'50'} value={data.url}/>
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