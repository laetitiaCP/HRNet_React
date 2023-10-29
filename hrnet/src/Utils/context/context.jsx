import {createContext, useState} from "react";

export const ListEmployeesContext = createContext();

export const ListEmployeesProvider = ({ children }) => {
    const [listEmployees, setListEmployees] = useState([]);
    const saveEmployees = (newEmployee) => {
        setListEmployees([...listEmployees, {...newEmployee}])
    }

    return (
        <ListEmployeesContext.Provider value={{listEmployees, saveEmployees}}>
            {children}
        </ListEmployeesContext.Provider>
    )
}