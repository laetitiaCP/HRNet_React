import logo from "../../images/logo.png";
import "./header.scss";
import {Link} from "react-router-dom";

function Header({title}) {

    return (
        <div className="header">
            <div className="header__logos">
                <div>
                    <img className="header__logos__logo" src={logo} alt="logo de Wealth health"/>
                    <h2 className="header__logos__title">WEALTH HEALTH</h2>
                </div>
                <h1 className="header__toolName">HRNet</h1>
            </div>
            <h2 className="header__title">{title}</h2>
            {title === "Create Employee"
                ? <Link to={"/employeeList"}>View Current Employees</Link>
                : <Link to={"/createEmployee"}>Home</Link>
            }
        </div>
    )
}
export default Header;