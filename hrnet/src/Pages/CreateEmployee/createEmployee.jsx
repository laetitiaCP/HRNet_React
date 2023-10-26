import Header from "../../Components/Header/header";
import {useState} from "react";
import "./createEmployee.scss";
import DropdownComponent from "../../Components/Dropdown/dropdown";
import {states} from "../../Data/states";
import {department} from "../../Data/department";

function CreateEmployee() {
    const [formData, setFormData] = useState({
        firstname:"",
        lastname:"",
        dateOfBirth:"",
        startDate:"",
        street:"",
        city:"",
        state:"",
        zipCode:"",
        department:""
    })

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
                    if (item.id === value) {
                        return value = item.name;
                    }
                })
            }
            setFormData((prevState) => ({...prevState, [name]: value}));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    }

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
                <label htmlFor="firstname">Date of Birth</label>
                <input
                    type="text"
                    name="dateBirth"
                    value={formData.dateOfBirth}
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
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                />
                <DropdownComponent data={department} onChange={handleChangeDropdown} nameDropdown="Department"/>
                <input type="submit" value="Save" />
            </form>
        </div>

    )
}

export default CreateEmployee;