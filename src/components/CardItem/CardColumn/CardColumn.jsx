import './CardColumn.css'

const CardColumn = ({className, name, nameColumn}) => {
    return(
    <div className={className}>
        <h3>{name}</h3>
        <span>{nameColumn}</span>
    </div>
    )
}

export default CardColumn