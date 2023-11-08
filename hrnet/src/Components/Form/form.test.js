import {fireEvent, render, screen} from "@testing-library/react";
import Form from "./form";
import {ListEmployeesProvider} from "../../Utils/context/context";
import userEvent from "@testing-library/user-event";
import DropdownComponent from "../Dropdown/dropdown";
import Modal from "../Modal/modal";
import {states} from "../../Data/states";
import {department} from "../../Data/department";
import React from "react";

describe("<Form />", () => {
    render(<ListEmployeesProvider><Form /></ListEmployeesProvider>);
    test("Tous les champs du formulaire apparaissent", () => {
        expect(document.querySelector("input[name='firstname']")).toBeVisible();
        expect(document.querySelector("input[name='lastname']")).toBeVisible();
        expect(document.querySelector("input[name='dateOfBirth']")).toBeVisible();
        expect(document.querySelector("input[name='startDate']")).toBeVisible();
        expect(document.querySelector("input[name='street']")).toBeVisible();
        expect(document.querySelector("input[name='city']")).toBeVisible();
        expect(document.querySelector("input[name='zipCode']")).toBeVisible();
        expect(document.querySelector("input[id='button-submit']")).toBeVisible();
    })

    test("le bouton 'submit' fonctionne", async () => {
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

        const textModal = screen.getByText("Employee Created!");

        expect(textModal).toBeVisible();

    })
})