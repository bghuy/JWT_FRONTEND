import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete(props) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setShow(props.isShowDeleteModal)
    }, [props])
    return (
        <>
            <Modal show={show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Are you sure to delete user with email: ${props.userData.email} ?`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { props.confirmDeleteUser(props.userData) }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;