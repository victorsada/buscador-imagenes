import React from "react";
import Imagen from "./Imagen";
const ListadoImagenes = ({ imagenes }) => {
  return (
    <div className="col-12 p-5 row">
      {imagenes.map(imagen => {
        return <Imagen key={imagen.id} imagen={imagen} />; //imagen={imagen} primer imagen nombre del prop / segunda imagen es el parametro dentro del map para usar los atributos del API
      })}
    </div>
  );
};

export default ListadoImagenes;
