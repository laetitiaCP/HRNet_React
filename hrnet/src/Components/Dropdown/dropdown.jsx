import {useState} from "react";
import chevronUp from "../../images/chevron-up.svg";
import chevronDown from "../../images/chevron-down.svg";
import "./dropdown.scss";

/**
 * dropdown component
 * @param {array<object>} data data in dropdown
 * @constructor
 */
function DropdownComponent({data, onChange, nameDropdown}) {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState(data);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleItemClick = (id) => {
        selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
        onChange({name:nameDropdown,value:id})
        toggleDropdown();
    };

    return (
        <div className="dropdown">
            <div className="dropdown__header" onClick={toggleDropdown}>
                {selectedItem ? items.find(item => item.id === selectedItem).name : nameDropdown}
                {!isOpen && <img src={chevronDown} alt="chevron bas" />}
                {isOpen && <img src={chevronUp} alt="chevron haut" />}
            </div>
            <div className={`dropdown__body ${isOpen && `open`}`}>
                {items.map(item => (
                    <div className="dropdown__item"
                         onClick={e => handleItemClick(e.target.id)}
                         id={item.id}
                         key={item.id}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DropdownComponent;