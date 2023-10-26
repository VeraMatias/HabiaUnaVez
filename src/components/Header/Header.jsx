import './Header.css'

import { Link } from 'react-router-dom'

const Header = () =>{
    return(
    <section className="home-section">
        <Link to={'/'}>
            <h1 className="title">Había Una Vez</h1>
        </Link>
    </section>
    )
}

export default Header