import './ModalUpdateCreate.css'

import { useModal } from '../../../hooks/useModal'

const ModalUpdateCreate = ({show, close, item, update, url, title}) => {

    const {data, handleInput, handleSubmit} = useModal(item, url, update)

    return(
        <>
        {show ? 
            <div className="modal-container" onClick={close}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2 className="header-title">{update ? `Modificar ${title}` : `Crear ${title}`}</h2>
                    </div>

                    <div className="modal-content">
                        <p>A continuación, ingrese el nombre:</p>
                        <form onSubmit={handleSubmit} id='form-submit'> 
                            <input type='text' name='name' onChange={handleInput} maxLength={'50'} className='input-name' value={data.name}></input>
                        </form>
                    </div>

                    <div className="modal-buttons">
                        <button className=" btn-save save" type='submit' form='form-submit'>Guardar</button>
                        <button className="cancel" onClick={close}>Cancelar</button>
                    </div>
                </div>
            </div>
        : null}
        </>
    )
}

export default ModalUpdateCreate