import React, { useState } from "react";
import FormularioUsuario from "./FormularioUsuario";
import ListaUsuarios from "./ListaUsuarios";

export default function Usuarios() {
  const [reload, setReload] = useState(false);

  const handleUsuarioCreado = () => {
    setReload((r) => !r);
  };

  return (
    <>
      <FormularioUsuario onUsuarioCreado={handleUsuarioCreado} />
      <ListaUsuarios reload={reload} />
    </>
  );
}
