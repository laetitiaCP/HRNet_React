import {render, screen} from "@testing-library/react";
import {ListEmployeesProvider} from "../../Utils/context/context";
import Form from "../Form/form";
import DropdownComponent from "../Dropdown/dropdown";
import {department} from "../../Data/department";
import {states} from "../../Data/states";
import Modal from "./modal";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("<Modal />", () => {
    test("le bouton pour fermer la modale fonctionne", async () => {
        const {container} = render(<ListEmployeesProvider><Form />/></ListEmployeesProvider>);
        render(<DropdownComponent data={department} nameDropdown="Department"/>);
        render(<DropdownComponent data={states} nameDropdown="States"/>);
        render(<Modal />);

        const firstname = document.querySelector("input[name='firstname']");
        await userEvent.type(firstname, "prenom");
        const lastname = document.querySelector("input[name='lastname']");
        await userEvent.type(lastname, "nom");
        const dateOfBirth = document.querySelector("input[name='dateOfBirth']");
        await userEvent.type(dateOfBirth, "2023/01/01");
        const startDate = document.querySelector("input[name='startDate']");
        await userEvent.type(startDate, "2023/06/06");
        const street = document.querySelector("input[name='street']");
        await userEvent.type(street, "rue");
        const city = document.querySelector("input[name='city']");
        await userEvent.type(city, "ville");
        const zipCode = document.querySelector("input[name='zipCode']");
        await userEvent.type(zipCode, "77860");
        const selectDepartment = document.querySelector("div[class='dropdown__header']");
        await userEvent.click(selectDepartment);
        const alabama = document.querySelector("div[id='AL']");
        await userEvent.click(alabama);
        const selectStates = document.querySelector("div[class='dropdown__header']");
        await userEvent.click(selectStates);
        const marketing = document.querySelector("div[id='0']");
        await userEvent.click(marketing);

        const button = container.querySelector("input[id='button-submit']");
        await userEvent.click(button);

        const closeButton = container.querySelector("button[class='modal__close']");
        expect(closeButton).toBeVisible();
        await userEvent.click(closeButton);
        expect(closeButton).not.toBeVisible();
    })
})