import { useState } from 'react'
import './ModalUpdateCreate.css'

import { createRequest, updateRequest } from '../../../api/basicRequest'

const ModalUpdateCreate = ({show, close, institution, update}) => {
    const [data, setData]  =useState({name: institution.name})

    const handleInput = (e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }

    function  handleSubmit() {
        update ?
        updateRequest(`/bags/institution/${institution.id}/`, {name: data.name})
        :
        createRequest(`/bags/institution/`, {name: data.name})
    }

    return(
        <>
        {show ? 
            <div className="modal-container" onClick={close}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2 className="header-title">{update ? 'Modificar Institución' : 'Crear Institución'}</h2>
                    </div>

                    <div className="modal-content">
                        <p>A continuación, ingrese el nombre:</p>
                        <form onSubmit={handleSubmit} id='form-submit'> 
                            <input type='text' name='name' onChange={handleInput} maxLength={'50'} className='input-name'></input>
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