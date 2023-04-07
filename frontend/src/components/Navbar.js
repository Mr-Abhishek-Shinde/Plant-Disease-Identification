import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <header>
            <div className="container">
                <Link to='/'>Home</Link>
            </div>
            <nav>
                <Link to='/404'><p>404 Page</p></Link>
            </nav>
        </header>
    )
}

export default Navbar;