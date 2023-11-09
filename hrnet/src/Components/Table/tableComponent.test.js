import {render, screen} from "@testing-library/react";
import TableComponent from "./tableComponent";

describe("<TableComponent />", () => {
    test("Le nombre de colonnes est correct", () => {
        const tableHeader = () => {
            let headerElement = ["un", "deux", "trois", "quatre"];
            return headerElement.map((header) => {
                return <th key={header}>{header}</th>
            });
        };
        const dataBody = () => {
            const listData = [{un:"premier", deux:"deuxième", trois:"troisième", quatre:"quatrième"}];
            return listData.map(({un, deux, trois, quatre}, index) => {
                return (
                    <tr key={index}>
                        <td>{un}</td>
                        <td>{deux}</td>
                        <td>{trois}</td>
                        <td>{quatre}</td>
                    </tr>
                )
            })
        }
        const container = render(<TableComponent dataHeader={tableHeader} dataBody={dataBody}/>)

        expect(container.getAllByRole("columnheader")).toHaveLength(4);
    })

    test("Le nombre de lignes est correct", () => {
        const tableHeader = () => {
            let headerElement = ["un", "deux", "trois", "quatre"];
            return headerElement.map((header) => {
                return <th key={header}>{header}</th>
            });
        };
        const dataBody = () => {
            const listData = [{un:"premier", deux:"deuxième", trois:"troisième", quatre:"quatrième"}];
            return listData.map(({un, deux, trois, quatre}, index) => {
                return (
                    <tr key={index}>
                        <td>{un}</td>
                        <td>{deux}</td>
                        <td>{trois}</td>
                        <td>{quatre}</td>
                    </tr>
                )
            })
        }
        const container = render(<TableComponent dataHeader={tableHeader} dataBody={dataBody}/>)

        expect(container.getAllByRole("row")).toHaveLength(2); // header + data = 2 lignes
    })
})