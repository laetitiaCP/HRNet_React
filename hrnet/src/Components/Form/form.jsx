import {useContext, useState} from "react";
import "./form.scss";
import DropdownComponent from "../../Components/Dropdown/dropdown";
import {states} from "../../Data/states";
import {department} from "../../Data/department";
import {ListEmployeesContext} from "../../Utils/context/context";
import Modal from "../../Components/Modal/modal";

function Form() {
    const [formData, setFormData] = useState({
        firstname:"",
        lastname:"",
        dateOfBirth:"",
        startDate:"",
        street:"",
        city:"",
        zipCode:"",
        Department:"",
        States:"",
    })

    const { saveEmployees, listEmployees } = useContext(ListEmployeesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClear, setIsClear] = useState(false);
    const [idDropdown, setIdDropdown] = useState("")

    const handleChange = (event) => {
        if (event.target !== undefined) {
            let {name, value} = event.target;
            setFormData((prevState) => ({...prevState, [name]: value}));
           }
    };

    const handleChangeDropdown = (event) => {
        setIsClear(false);
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

        if (formData.Department === "" || formData.States === "") {
            let invalidDropdown = document.getElementsByClassName("dropdown");
            let messageSpan = document.createElement("span");
            messageSpan.setAttribute("id","text-invalid");
            messageSpan.textContent = "Tous les champs doivent être remplis";
            invalidDropdown[1].appendChild(messageSpan);

            return setIdDropdown("invalid");

        } else {
            setIdDropdown("");
            if (document.getElementById("text-invalid")) {
                document.getElementById("text-invalid").remove();
            }
            saveEmployees(formData);
            openModal();
            setFormData({
                firstname:"",
                lastname:"",
                dateOfBirth:"",
                startDate:"",
                street:"",
                city:"",
                zipCode:"",
                Department: "",
                States: "",
            })
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
        setIsClear(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="startDate">Start date</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />
                <fieldset className="form__address">
                    <legend>Address</legend>
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                    <DropdownComponent data={states} onChange={handleChangeDropdown} nameDropdown="States" clear={isClear} idDropdown={idDropdown}/>
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                        type="number"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <DropdownComponent data={department} onChange={handleChangeDropdown} nameDropdown="Department" clear={isClear} idDropdown={idDropdown}/>
                <input id="button-submit" type="submit" value="Save" />
            </form>
            <Modal isOpen={isModalOpen} onClose={() => closeModal()}>
                <h2 className="modal_employee">Employee Created!</h2>
            </Modal>
        </div>

    )
}

export default Form;