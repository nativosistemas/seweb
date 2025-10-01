
import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';

export function ModalAlert({ isLoading = false }) {
    return (
        <Modal show={isLoading} centered backdrop="static" keyboard={false}>
            <Modal.Body className="text-center">
                <Spinner animation="border" role="status" className="mb-3" />
                <p>Obteniendo datos del servidor. Un momento por favor.</p>
            </Modal.Body>
        </Modal>
    );
}


