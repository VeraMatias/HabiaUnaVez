import './ModalContainer.css'

const ModalContainer = ({show, close, title, modalContent}) => {

    return(
        <>
        {show ? 
            <div className="modal-container" onClick={close}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2 className="header-title">{title}</h2>
                    </div>

                    {modalContent}

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

export default ModalContainer