import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="nav-title">
                <h1 className="title">AgroNexus</h1>
                <h3>From Diagnosis To Solution</h3>
            </div>
            <nav>
                <li><Link to='/home'>Home</Link></li>
            </nav>
        </div>
    )
}

export default Navbar;