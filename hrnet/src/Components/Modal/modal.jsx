import "./modal.scss";
function Modal({isOpen, onClose, children}) {

    if (isOpen === false) {
        return null;
    }

    const close = (e) => {
        e.preventDefault();
        if (onClose) {
            onClose();
        }
    }

    return (
        <div>
            <div className="modal">
                <div className="modal__header">
                    <button onClick={onClose} className="modal__close">&times;</button>
                </div>
                {children}
            </div>
            <div className="bg" onClick={e => close(e)}></div>
        </div>
    )
}

export default Modal;