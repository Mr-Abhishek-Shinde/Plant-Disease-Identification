import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <h1 className="title">Plant Disease Identification</h1>
            <nav>
                <li><Link to='/'>Home</Link></li>
            </nav>
        </div>
    )
}

export default Navbar;