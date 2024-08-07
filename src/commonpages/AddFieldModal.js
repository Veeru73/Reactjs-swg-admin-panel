import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { errorAlert } from '../components/Alert';

export const AddFieldModal = ({ show, handleClose, handleAddField }) => {
    const [fieldTitle, setFieldTitle] = useState('');
    const [fieldPlaceholder, setFieldPlaceholder] = useState('');

    const handleSubmit = () => {
        if(!fieldTitle){errorAlert("Please Enter Title");return}
        handleAddField(fieldTitle, fieldPlaceholder);
        setFieldTitle('');
        setFieldPlaceholder('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Field</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Field Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={fieldTitle}
                            onChange={(e) => setFieldTitle(e.target.value)}
                            placeholder="Enter field title"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={fieldPlaceholder}
                            onChange={(e) => setFieldPlaceholder(e.target.value)}
                            placeholder="Enter Description"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type='button' variant="primary" onClick={handleSubmit}>
                    Add Field
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
