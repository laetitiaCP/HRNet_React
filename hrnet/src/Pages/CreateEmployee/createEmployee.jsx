import Header from "../../Components/Header/header";
import {useContext, useState} from "react";
import "./createEmployee.scss";
import DropdownComponent from "../../Components/Dropdown/dropdown";
import {states} from "../../Data/states";
import {department} from "../../Data/department";
import {ListEmployeesContext} from "../../Utils/context/context";
import Modal from "../../Components/Modal/modal";

function CreateEmployee() {
    const [formData, setFormData] = useState({
        firstname:"",
        lastname:"",
        dateOfBirth:"",
        startDate:"",
        street:"",
        city:"",
        zipCode:"",
    })

    const { saveEmployees, listEmployees } = useContext(ListEmployeesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (event) => {
        console.log(event)
        if (event.target !== undefined) {
            const {name, value} = event.target;
            setFormData((prevState) => ({...prevState, [name]: value}));
        }
    };

    const handleChangeDropdown = (event) => {
        console.log(event)
        if (event !== undefined) {
            let {name, value} = event;
            if (name === "Department") {
                department.find(item => {
                    console.log(item)
                    if (item.id === value) {
                        return value = item.name;
                    }
                    return null;
                })
            }
            setFormData((prevState) => ({...prevState, [name]: value}));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        saveEmployees(formData)
        openModal();
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Header title="Create Employee"/>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                />
                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                />
                <label htmlFor="dateBirth">Date of Birth</label>
                <input
                    type="date"
                    name="dateBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                />
                <label htmlFor="startDate">Start date</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                />
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
                <DropdownComponent data={states} onChange={handleChangeDropdown} nameDropdown="States"/>
                <label htmlFor="zipCode">Zip Code</label>
                <input
                    type="number"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                />
                <DropdownComponent data={department} onChange={handleChangeDropdown} nameDropdown="Department"/>
                <input type="submit" value="Save" />
            </form>
            <Modal isOpen={isModalOpen} onClose={() => closeModal()}>
                <h2 className="modal_employee">Employee Created!</h2>
            </Modal>
        </div>

    )
}

export default CreateEmployee;