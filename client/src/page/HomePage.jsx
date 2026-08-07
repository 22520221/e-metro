import { Link } from "react-router-dom";

function HomePage() {

    return (

        <div>

            <h1>e-Metro</h1>

            <p>Hệ thống quản lý tàu điện Metro</p>

            <Link to="/stations">Quản lý Ga</Link>

            <br />
            <br />

            <Link to="/trains">Quản lý Tàu</Link>

            <br />
            <br />
            
            <Link to="/lines">Quản lý Tuyến</Link>

            <br />
            <br />
            <Link to="/schedules">Quản lý Lịch</Link>

            <br />
            <br />
            <Link to="/tickets">Quản lý Vé</Link>
        </div>

    );

}

export default HomePage;