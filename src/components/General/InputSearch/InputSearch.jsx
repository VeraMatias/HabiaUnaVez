import './InputSearch.css'


const InputSearch = ({handleInput}) => {
    return(
        <div className="container-search">
            <input id="search" type="search" className='input-search' placeholder="Buscar..." maxLength={6} onChange={handleInput}/>
        </div>
    )
}

export default InputSearch