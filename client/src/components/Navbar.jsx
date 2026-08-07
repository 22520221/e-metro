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

            <Link to="/schedules">
                Schedules
            </Link>

            <Link to="/tickets">
                Tickets
            </Link>

        </nav>

    );

}

export default Navbar;