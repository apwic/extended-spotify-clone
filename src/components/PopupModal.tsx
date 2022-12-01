import React, { useContext, useEffect } from "react";
import Modal from "react-responsive-modal";
import { ModalContext } from "../context/ModalContext";

import "../styles/modal.css";
import "react-responsive-modal/styles.css";

const PopupModal = () => {
    const modalContext = useContext(ModalContext);

    useEffect(() => {
        console.log(modalContext.type + "hahaah");
    }), [modalContext.type]

    return (
        <Modal
            open={modalContext.open && modalContext.type === "popup"}
            onClose={() => modalContext.setOpen(false)}
            classNames={{
                modalContainer: "modal-container",
                closeIcon: "modal-close-icon",
                modal: "modal-card"
            }}
            focusTrapped={false}
        >
            <div className="modal-inner-card">
                <div className="modal-text-content">
                    {modalContext.msg} 
                </div>
            </div>
        </Modal>
    )
}

export default PopupModal;
