import React, { useState } from 'react';

export function RangeValue({ initialValorRango ,valor, initialLabel = "Valor", onValueChange }) {
  // 1. Usa `useState` para crear una variable de estado para el valor del rango
 // const [valorRango, setValorRango] = useState(initialValorRango); // Valor inicial
  const [labelName] = useState(initialLabel); // Valor inicial
  // 2. Crea un controlador de eventos para actualizar el estado
  const handleRangeChange = (event) => {
    const nuevoValor = event.target.value;
    //setValorRango(nuevoValor);
    if (onValueChange) {
      onValueChange(Number(nuevoValor)); // Convertir a número es buena práctica
    }
  };

  return (
    <div class="container ">
      <div class="row">
        <div class="col">
          <label htmlFor="volumeRange" className="form-label mb-0 me-3">
            {labelName}:
          </label>
          <input
            type="range"
            className="form-range"
            min="-45"
            max="225"
            step="0.01"
            value={valor} // 3. Vincula el input al estado
            id="volumeRange"
            onChange={handleRangeChange} // 4. Asigna el controlador al evento `onChange`
          />
          {/* Muestra el valor del estado en un elemento paralelo */}
          <span id="rangeValue" className="ms-3">
            {valor}
          </span>
        </div>
      </div>
    </div>
  );
}

//export default RangeConValor;
