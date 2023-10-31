import { useModal } from '../../../hooks/useModal'
import './ModalDelete.css'

const ModalDelete = ({show, close, item, title, url}) => {

    const {handleDelete} = useModal(item, url)
    
    return(
        <>
        {show ? 
            <div className="modal-container" onClick={close}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2 className="header-title">Eliminar {title}</h2>
                    </div>

                    <div className="modal-content">
                        <p>Desea eliminar la {title} <span>{item.name}</span>?</p>
                    </div>
                
                    <div className="modal-buttons">
                        <button className="cancel" onClick={handleDelete}> Eliminar </button>
                        <button className="save" onClick={close}>Cancelar</button>
                    </div>
                </div>
            </div>
        : null}
        </>
    )
        }

export default ModalDelete