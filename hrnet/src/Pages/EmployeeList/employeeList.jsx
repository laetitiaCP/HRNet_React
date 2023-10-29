import "./employeeList.scss";
import {useContext, useState} from "react";
import {ListEmployeesContext} from "../../Utils/context/context";
import Header from "../../Components/Header/header";
function EmployeeList() {
    const { listEmployees } = useContext(ListEmployeesContext);
    const [query, setQuery] = useState({search:""});
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    let nPages;

    const tableHeader = () => {
        let headerElement = ["firstname", "lastname", "startDate", "Department", "dateOfBirth", "street", "city", "State", "zipCode"];
        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        });
    }

    const bodyTable = () => {
        let listEmployeesFilter;

        if(query.search === "") {
            listEmployeesFilter = listEmployees;
        } else {
            listEmployeesFilter =
                 listEmployees.filter((employee) =>
                      employee.firstname.toLowerCase().match(query.search.toLowerCase()) ||
                        employee.lastname.toLowerCase().match(query.search.toLowerCase()) ||
                        employee.firstname.toLowerCase().match(query.search.toLowerCase()) ||
                        employee.startDate.toLowerCase().match(query.search.toLowerCase()) ||
                        employee.Department.toLowerCase().match(query.search.toLowerCase()) ||
                        employee.dateOfBirth.toLowerCase().match(query.search.toLowerCase()) ||
                        employee.street.toLowerCase().match(query.search.toLowerCase()) ||
                        employee.States.toLowerCase().match(query.search.toLowerCase()) ||
                        employee.zipCode.toLowerCase().match(query.search.toLowerCase())
                )
            }
        const currentRecords = listEmployeesFilter.slice(indexOfFirstRecord, indexOfLastRecord);
        nPages = Math.ceil(listEmployeesFilter.length / recordsPerPage);
        return currentRecords && currentRecords.map(({firstname, lastname, startDate, Department, dateOfBirth, street, city, States, zipCode}, index) => {
            return (
                <tr key={index}>
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{startDate}</td>
                    <td>{Department}</td>
                    <td>{dateOfBirth}</td>
                    <td>{street}</td>
                    <td>{city}</td>
                    <td>{States}</td>
                    <td>{zipCode}</td>
                </tr>
            )
        })
    };

    const handleChange = (e) => {
        let searchValue = e.target.value;
        setQuery({search: searchValue});
    }

    const handleChangeNbRows = (e) => {
        console.log(e.target.value)
       setRecordsPerPage(e.target.value);
    }

    return (
        <div>
            <Header title="Current Employees" />
            <div className="table">
                <div>
                    <input className="table__search" placeholder="Recherche" onChange={handleChange} />
                    <label>
                        Voir
                        <select name="selectRows" onChange={handleChangeNbRows}>
                            <option value="5">5</option>
                            <option value="10" selected="selected">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                         lignes
                    </label>
                </div>
                <table id="employees">
                    <thead>
                        <tr>{tableHeader()}</tr>
                    </thead>
                    <tbody>
                        {bodyTable()}
                    </tbody>
                </table>
                <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

function Pagination({nPages, currentPage, setCurrentPage}) {
    const pageNumbers = [...Array(nPages + 1 ).keys()].slice(1);

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <nav>
            <ul className="pagination">
                <li className="pagination__item">
                    <a className="pagination__link" onClick={prevPage}>
                        Précédent
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} className={`pagination__item ${currentPage === pgNumber ? "active" : ""}`}>
                        <a onClick={() => setCurrentPage(pgNumber)} className="pagination__link">
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="pagination__item">
                    <a className="pagination__link" onClick={nextPage}>
                        Suivant
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default EmployeeList;