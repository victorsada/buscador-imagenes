import React, { useState, useEffect } from "react";
import Formulario from "./Components/Formulario";
import ListadoImagenes from "./Components/ListadoImagenes";

function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === "") return; //si el state busqueda esta vacio, no ejecuta nada

      const imagenesPorPagina = 30;
      const key = "15267603-9d33c630e8e303a28df7e16a3";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);

      //calcular el numero de paginas para saber la paginacion
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      guardarTotalPaginas(calcularTotalPaginas);

      //Mover la pagina hacia arriba una vez que hagas paginacion
      const efectopaginacion = document.querySelector(".jumbotron");
      efectopaginacion.scrollIntoView({ behavior: "smooth" });
    };
    consultarAPI();
  }, [busqueda, paginaactual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    guardarPaginaActual(nuevaPaginaActual);

    if (nuevaPaginaActual > totalpaginas) return;
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {paginaactual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}

        {paginaactual === totalpaginas ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
// Your API key: 15267603-9d33c630e8e303a28df7e16a3
