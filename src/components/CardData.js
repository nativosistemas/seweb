
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

export function CardData({ titulo = "Cargando...", mensajeCardClick = null }) {
    //const [titulo, setTitulo] = useState(pTitulo);
    // const [mensajeCardClick, setMensajeCardClick] = useState(pMensaje);
    if (titulo == null) {
        return null; // No renderiza nada
    }
    return (
        <Card style={{ marginTop: '1rem', backgroundColor: 'rgba(25, 135, 84, 0.7)' }}>
            <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>
                    {mensajeCardClick}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}


