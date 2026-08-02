import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    return (

        <nav className="navbar">

            <Link to="/" end>
                Home
            </Link>

            <Link to="/stations">
                Stations
            </Link>

            <Link to="/trains">
                Trains
            </Link>

            <Link to="/lines">
                Lines
            </Link>

        </nav>

    );

}

export default Navbar;