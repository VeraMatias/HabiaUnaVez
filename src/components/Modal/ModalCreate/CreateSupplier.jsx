import './CreateSupplier.css'

import { useModal } from '../../../hooks/useModal'
import Input from '../../General/Input/Input'
import InputSelect from '../../General/InputSelect/InputSelect'

const CreateSupplier = ({item, url}) => {

    const {handleInput, handleCreate, dataOptionSupplier} = useModal(item, url)

    return(
        <div className="modal-content">
            <p>Ingrese los datos a continuación:</p>
            <form onSubmit={handleCreate} id='form-submit'> 
                <Input label={'Nombre'} type={'text'} name={'name'} handleInput={handleInput} maxLength={'50'} />
                <Input label={'Pagina WEB'} type={'url'} name={'url'} handleInput={handleInput} maxLength={'50'}/>
                <InputSelect label={'Talla'} name={'armhole'} onChange={handleInput} data={dataOptionSupplier}/>
            </form>
        </div> 
    )
}

export default CreateSupplier