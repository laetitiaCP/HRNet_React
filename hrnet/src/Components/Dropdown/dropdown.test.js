import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownComponent from "./dropdown";
import {department} from "../../Data/department";

describe ("<DropdownComponent />", () => {
    test("Le nom du dropdown s'affiche", () => {
        render(<DropdownComponent data={department} nameDropdown="Department"/>);
        expect(screen.getByText("Department")).toBeInTheDocument();
    })

    test("L'utilisateur clique sur le dropdown et il s'ouvre", async() => {
        const {container} = render(<DropdownComponent data={department} nameDropdown="Department"/>);

        await userEvent.click(screen.getByRole('img'));

        const dropdownbutton = await document.querySelector("div[class='dropdown__body open']")
        expect(dropdownbutton).toBeVisible();
    })

    test("L'utilisateur clique sur le dropdown deux fois, il doit être fermé", async() => {
        const {container} = render(<DropdownComponent data={department} nameDropdown="Department"/>);

        await userEvent.click(screen.getByRole('img'));
        await userEvent.click(screen.getByRole('img'));

        const dropdownbutton = await document.querySelector("div[class='dropdown__body false']")
        expect(dropdownbutton).toBeVisible();
    })
});