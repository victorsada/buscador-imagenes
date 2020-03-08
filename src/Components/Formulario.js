import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({ guardarBusqueda }) => {
  const [termino, guardarTermino] = useState("");
  const [error, guardarError] = useState(false);
  const buscarImagenes = e => {
    e.preventDefault();
    //validar
    if (termino.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    //pasar el beta al componente principal, APP.js
    guardarBusqueda(termino);
  };

  return (
    <form onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscá una Imágen"
            onChange={e => guardarTermino(e.target.value)}
          />
        </div>

        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? (
        <Error mensaje="El campo de búsqueda no debe estar vacío" />
      ) : null}
    </form>
  );
};

export default Formulario;
