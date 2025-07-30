import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationPopup = ({
    show,
    onHide,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to perform this action?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "primary",
    size = "md"
}) => {
    return (
        <Modal show={show} onHide={onHide} centered size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {cancelText}
                </Button>
                <Button variant={variant} onClick={onConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationPopup;