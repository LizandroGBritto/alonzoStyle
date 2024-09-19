import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import FormAgendar from "./FormAgendar";
import { GoArrowSwitch } from "react-icons/go";

const Agenda = ({ horarios, setHorarios, getUserId, agendarRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [userHasReservation, setUserHasReservation] = useState(false);
  const [mostrarManana, setMostrarManana] = useState(false); // Estado para alternar entre hoy y mañana

  const diasSemana = [
    "DOMINGO",
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SÁBADO",
  ];

  // Día de hoy
  const hoy = new Date();
  const diaHoy = diasSemana[hoy.getDay()];

  // Día de mañana
  const manana = new Date(hoy);
  manana.setDate(hoy.getDate() + 1);
  const diaManana = diasSemana[manana.getDay()];

  const UserId = getUserId();

  function onCloseModal() {
    setOpenModal(false);
    setSelectedId(null);
  }

  function refreshData() {
    axios
      .get("http://localhost:8000/api/agenda")
      .then((res) => {
        setHorarios(res.data.agendas);
        setIsLoading(false);
        console.log(res);

        const hasReservation = res.data.agendas.some(
          (agenda) => agenda.UserId === UserId
        );
        setUserHasReservation(hasReservation);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    refreshData();
  }, [setHorarios]);

  if (isLoading) return <h1>Loading...</h1>;

  // Filtrar los horarios dependiendo de si se muestran los de hoy o mañana
  const horariosFiltrados = horarios.filter((agenda) =>
    mostrarManana ? agenda.Dia === "Manana" : agenda.Dia === "Hoy"
  );

  return (
    <>
      <div ref={agendarRef} id="agendar">
        <h3 className="flex justify-center mt-8 ml-8 mr-8 border-b-2 border-gray-300 pb-2">
          AGENDA
        </h3>
        <div className="flex border-b-2 justify-between border-gray-300 ml-8 mr-8">
          <h3 className="flex justify-start mt-8 ml-8">HORA</h3>
          <Button
            color="dark"
            className="flex justify-start mt-6 mr-8 mb-2 bg-black"
            onClick={() => setMostrarManana(!mostrarManana)} // Alternar entre hoy y mañana
          >
            {mostrarManana ? `DÍA: ${diaManana}` : `DÍA: ${diaHoy}`}
            <GoArrowSwitch className="mt-1 ml-1" />
          </Button>
        </div>

        {horariosFiltrados.map((agenda) => (
          <div
            className="flex justify-between border-b-2 border-gray-300 pb-2 pl-4 mt-8 ml-8 mr-8"
            key={agenda._id}
          >
            <h3
              className={`flex justify-start ${
                agenda.UserId !== "" ? "line-through" : ""
              }`}
            >
              {agenda.Hora}
            </h3>
            {diaHoy === "DOMINGO" ? (
              <h3 className="flex justify-center mr-4 text-[#FF7D00]">
                <Button
                  disabled
                  className="flex justify-center bg-gray-400 rounded-lg text-black text-lg items-center"
                >
                  CERRADO
                </Button>
              </h3>
            ) : agenda.NombreCliente !== "" ? (
              <h3 className="flex justify-center mr-4 text-[#FF7D00]">
                {agenda.UserId === UserId ? (
                  <Button
                    className="flex justify-center bg-orange-500 rounded-lg text-black text-lg items-center"
                    onClick={() => {
                      setSelectedId(agenda._id);
                      setOpenModal(true);
                    }}
                  >
                    MODIFICAR
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="flex justify-center bg-gray-400 rounded-lg text-black text-lg items-center"
                  >
                    RESERVADO
                  </Button>
                )}
              </h3>
            ) : (
              <Button
                // Si el UserId es "Reservado", el botón cambia a "RESERVADO" y se deshabilita
                disabled={
                  agenda.UserId === "Reservado" ||
                  (userHasReservation && agenda.UserId !== UserId)
                }
                className={`flex justify-center mr-6 ${
                  agenda.UserId === "Reservado" ? "bg-gray-400" : "bg-white"
                } rounded-lg text-black text-lg items-center`}
                onClick={() => {
                  setSelectedId(agenda._id);
                  setOpenModal(true);
                }}
              >
                {agenda.UserId === "Reservado" ? "RESERVADO" : "AGENDAR"}
              </Button>
            )}

            <Modal
              className="flex justify-center items-center bg-black bg-opacity-15"
              show={openModal}
              size="sm"
              onClose={onCloseModal}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Datos para la reserva
                  </h3>
                  <div className="AgendarForm">
                    <FormAgendar
                      id={selectedId}
                      onCloseModal={onCloseModal}
                      refreshData={refreshData}
                      getUserId={getUserId}
                    />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        ))}
      </div>
    </>
  );
};

export default Agenda;
