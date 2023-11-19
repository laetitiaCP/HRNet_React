import "./employeeList.scss";
import "../../Components/Table/tableComponent.scss";
import {useContext, useEffect, useState} from "react";
import {ListEmployeesContext} from "../../Utils/context/context";
import Header from "../../Components/Header/header";
import TableComponent from "../../Components/Table/tableComponent";
import { dataListEmployees } from "./dataListEmployee";
function EmployeeList() {
    const { listEmployees } = useContext(ListEmployeesContext);
    //const listEmployees = dataListEmployees; //Pour tester avec des données de 50 lignes
    const [query, setQuery] = useState({search:""});
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const [nPages, setNPages] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [sortDirection, setSortDirection] = useState(false);
    const [listEmployeesFilter, setListEmployeesFilter] = useState([]);

    useEffect(() => {
        let filteredEmployees;

        if(query.search === "") {
            filteredEmployees = listEmployees;

        } else {
            filteredEmployees =
                listEmployees.filter((employee) =>
                    employee.firstname.toLowerCase().match(query.search.toLowerCase()) ||
                    employee.lastname.toLowerCase().match(query.search.toLowerCase()) ||
                    employee.city.toLowerCase().match(query.search.toLowerCase()) ||
                    employee.startDate.toLowerCase().match(query.search.toLowerCase()) ||
                    employee.Department.toLowerCase().match(query.search.toLowerCase()) ||
                    employee.dateOfBirth.toLowerCase().match(query.search.toLowerCase()) ||
                    employee.street.toLowerCase().match(query.search.toLowerCase()) ||
                    employee.States.toLowerCase().match(query.search.toLowerCase()) ||
                    employee.zipCode.toLowerCase().match(query.search.toLowerCase())
                )
        }
        filteredEmployees.sort(sortDataBy(sortBy, sortDirection));
        setListEmployeesFilter(filteredEmployees);
        setNPages(Math.ceil(filteredEmployees.length / recordsPerPage));
    }, [query, listEmployees, sortBy, sortDirection, recordsPerPage]);

    const handleChange = (e) => {
        const searchValue = e.search;
        setQuery({search: searchValue});
    }

    const handleHeader = (e) => {
        const newSortBy = e.target.text;
        if (sortBy !== newSortBy ) {
            setSortBy(newSortBy);
            setSortDirection(false); //changement de colonne -> reset de l'ordre de tri
        } else {
            setSortBy((prevSortBy) => {
                if (prevSortBy === newSortBy) {
                    setSortDirection(prevSortDirection => !prevSortDirection); // même colonne -> changement de l'ordre de tri
                }
                return newSortBy;
            });
        }
    }

    const tableHeader = () => {
        let headerElement = ["firstname", "lastname", "startDate", "Department", "dateOfBirth", "street", "city", "States", "zipCode"];
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
        if (listEmployeesFilter !== undefined) {
            const currentRecords = listEmployeesFilter.slice(indexOfFirstRecord, indexOfLastRecord);

            return currentRecords.map(({
                                           firstname,
                                           lastname,
                                           startDate,
                                           Department,
                                           dateOfBirth,
                                           street,
                                           city,
                                           States,
                                           zipCode
                                       }, index) => {
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
        }
    };

    const sortDataBy = (sortBy, direction) => (a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'startDate' || sortBy === 'dateOfBirth') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (direction) {
            return aValue > bValue ? 1 : (aValue < bValue ? -1 : 0);
        }

        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
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