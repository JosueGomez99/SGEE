import React, { useState } from "react";
import FormularioVehiculo from "./FormularioVehiculo";
import ListaVehiculos from "./ListaVehiculos";

export default function Vehiculos() {
  const [reload, setReload] = useState(false);

  const handleVehiculoCreado = () => {
    setReload((r) => !r);
  };

  return (
    <>
      <FormularioVehiculo onVehiculoCreado={handleVehiculoCreado} />
      <ListaVehiculos reload={reload} />
    </>
  );
}
