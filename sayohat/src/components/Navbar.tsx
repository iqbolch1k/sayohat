import { NavLink } from "react-router-dom"
import './Navabr.css'
function Navbar() {
    return (
        <div>
            <div className="navbar">
                <div className="container">
                    <div className="logo">
                        Tour
                    </div>
                    <nav className="nav">
                        <NavLink to={'/'}>Home</NavLink>
                        <NavLink to={'/tours'}>Tours</NavLink>
                        <NavLink to={'/categories'}>Categories</NavLink>
                    </nav>
                    <input type="text" className="search" placeholder="Search..." />
                    <div className="my-name-admin">
                        <h2>Abduvaliyev Iqboljon</h2>
                        <p>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar