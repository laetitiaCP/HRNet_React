import {render} from "@testing-library/react";
import TableComponent from "./tableComponent";

describe("<TableComponent />", () => {
    test("Les colonnes sont bien présentes", () => {
        const sortBy = jest.fn();
        const handleHeader = jest.fn();
        const sortDirection = jest.fn();
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
        render(<TableComponent dataHeader={tableHeader} dataBody={dataBody}/>)
    })
})