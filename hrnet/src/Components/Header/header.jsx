import logo from "../../images/logo.png";
import "./header.scss";
import {Link} from "react-router-dom";

function Header({title}) {

    return (
        <div className="header">
            <img className="header__logo" src={logo} alt="logo de Wealth health"/>
            <h1 className="header__title">{title}</h1>
            {title === "Create Employee"
                ? <Link to={"/employeeList"}>View Curent Employees</Link>
                : <Link to={"/createEmployee"}>Home</Link>
            }
        </div>
    )
}
export default Header;