import './Modal.css'

const Modal = ({show, close, title, institution, update}) => {

    return(
        <>
        {show ? 
            <div className="modal-container" onClick={close}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2 className="header-title">{title}</h2>
                    </div>
                {update ? 
                    <div className="modal-content">
                        <p>Hola Modificar <span>{institution.name}</span></p>
                    </div>
                    :
                    <div className="modal-content">
                        <p>Desea eliminar la institución <span>{institution.name}</span>?</p>
                    </div>
                }
                    <div className="modal-buttons">
                        <button className="save" >{update ? 'Guardar': 'Confirmar'} </button>
                        <button className="cancel" onClick={close}>Cancelar</button>
                    </div>
                </div>
            </div>
        : null}
        </>
    )
}

export default Modal