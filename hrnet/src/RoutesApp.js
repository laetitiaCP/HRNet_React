import './RoutesApp.css';
import {Route, Routes} from "react-router-dom";
import CreateEmployee from "./Pages/CreateEmployee/createEmployee";
import EmployeeList from "./Pages/EmployeeList/employeeList";

function RoutesApp() {

  return (
    <Routes>
      <Route path="/createEmployee" element={<CreateEmployee />}/>
      <Route path="/employeeList" element={<EmployeeList />} />
    </Routes>
  );
}

export default RoutesApp;
