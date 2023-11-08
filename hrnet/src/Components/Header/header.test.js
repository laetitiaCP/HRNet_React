import Header from "../Header/header"
import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {Link} from "react-router-dom";

describe("<Header />", () => {
    const container = render(<MemoryRouter><Header title="Create Employee" /></MemoryRouter> );

    test("Le titre de la page s'affiche", () => {
        expect(screen.getByText("Create Employee")).toBeInTheDocument();
    })

    test("Le lien vers l'autre page est visible", () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Header title="Create Employee"/>}/>
                </Routes>
            </MemoryRouter>,
        );
        const links = screen.getAllByRole("link");
        expect(links[0].href).not.toContain("/createEmployee");
        expect(links[0].href).toContain("/employeeList");
    })

    test("Le lien vers l'autre page est visible", () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Header title="Current Employees"/>}/>
                </Routes>
            </MemoryRouter>,
        );
        const links = screen.getAllByRole("link");
        expect(links[0].href).toContain("/createEmployee");
        expect(links[0].href).not.toContain("/employeeList");
    })
})