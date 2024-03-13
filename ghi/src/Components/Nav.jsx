import { NavLink } from "react-router-dom";
import LogoutButton from './LogoutButton';

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Travel Tracers</NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="api/signup">Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="api/login">Sign In</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="api/budgets">Budget</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="api/packing_list">Packing List</NavLink>
                     </li>
                    {LogoutButton}
                        <li className="nav-item">
                            <LogoutButton />
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}
export default Nav;
