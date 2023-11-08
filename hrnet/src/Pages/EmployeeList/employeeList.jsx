import "./employeeList.scss";
import {useContext, useState} from "react";
import {ListEmployeesContext} from "../../Utils/context/context";
import Header from "../../Components/Header/header";
import TableComponent from "../../Components/Table/tableComponent";
function EmployeeList() {
    const { listEmployees } = useContext(ListEmployeesContext);
    const [query, setQuery] = useState({search:""});
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const [nPages, setNPages] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [sortDirection, setSortDirection] = useState(false);

    const handleChange = (e) => {

        let searchValue = e.search;
        setQuery({search: searchValue});
    }

    const handleHeader = (e) => {
        console.log(e.target.text)
        if (sortBy === "" ) {
            setSortBy(e.target.text)
        }
        if (sortBy === e.target.text) {
            setSortDirection(!sortDirection);
        } else {
            setSortBy(e.target.text);
        }
    }

    const tableHeader = () => {
        let headerElement = ["firstname", "lastname", "startDate", "Department", "dateOfBirth", "street", "City", "States", "zipCode"];
        return headerElement.map((header) => {
            return <th key={header}
                       className={sortBy === header ? sortDirection ? "ascending-sort" : "descending-sort" : ""}>
                <a onClick={handleHeader}>
                    {header}
                </a>
            </th>
        });
    }


    const bodyTable = () => {
        let listEmployeesFilter;
        console.log(listEmployees)
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
        setNPages(Math.ceil(listEmployeesFilter.length / recordsPerPage));
        console.log(sortBy, sortDirection)
        console.log(currentRecords)
        return currentRecords && currentRecords.sort(sortDataBy(sortBy, sortDirection)).map(({firstname, lastname, startDate, Department, dateOfBirth, street, city, States, zipCode}, index) => {
            return (
                <tr key={index}>
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{new Date(startDate).toLocaleDateString("fr-FR")}</td>
                    <td>{Department}</td>
                    <td>{new Date(dateOfBirth).toLocaleDateString("fr-FR")}</td>
                    <td>{street}</td>
                    <td>{city}</td>
                    <td>{States}</td>
                    <td>{zipCode}</td>
                </tr>
            )
        })
    };

    const sortDataBy = (sortBy, direction) => (a, b) => {
        if (direction) {
            return a[sortBy] > b[sortBy] ? 1 : (a[sortBy] < b[sortBy] ? -1 : 0);
        }
        return a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
    };



    const handleChangeNbRows = (e) => {
       setRecordsPerPage(e);
    }

    return (
        <div>
            <Header title="Current Employees" />
            <TableComponent
                onChangeQuery={handleChange}
                handleChangeNbRows={handleChangeNbRows}
                dataHeader={tableHeader}
                dataBody={bodyTable}
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}



export default EmployeeList;