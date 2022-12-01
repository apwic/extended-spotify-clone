import React, { useContext, useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import "../styles/modal.css";

import "react-responsive-modal/styles.css";
import { ModalContext } from "../context/ModalContext";

const ErrorModal = () => {
    const modalContext = useContext(ModalContext);

    return (
        <Modal 
            open={modalContext.open && modalContext.type === "error"} 
            onClose={() => modalContext.setOpen(false)} 
            center
            classNames={{
                modalContainer: "modal-container",
                closeIcon: "modal-close-icon",
                modal: "modal-card"
            }}
            focusTrapped={false}
        >
            <div className="modal-inner-card">
                <div className="modal-text-title">
                    OOPS!</div>
                <div className="modal-text-subtitle">
                    we encountered an error...
                </div>
                <div className="modal-text-content">
                    {modalContext.msg} 
                </div>
            </div>
        </Modal>
    );
}

export default ErrorModal;