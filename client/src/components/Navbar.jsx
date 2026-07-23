import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    return (

        <nav>

            <Link to="/">
                Home
            </Link>

            <Link to="/stations">
                Stations
            </Link>

            <Link to="/trains">
                Trains
            </Link>

        </nav>

    );

}

export default Navbar;