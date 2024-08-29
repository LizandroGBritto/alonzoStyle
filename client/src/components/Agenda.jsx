import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import FormAgendar from "./FormAgendar";

const Agenda = ({ horarios, setHorarios, getUserId, agendarRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // Nuevo estado para almacenar el ID seleccionado

  const UserId = getUserId();

  function onCloseModal() {
    setOpenModal(false);
    setSelectedId(null); // Reseteamos el ID seleccionado al cerrar el modal
  }
  function refreshData() {
      axios
        .get("http://localhost:8000/api/agenda")
        .then((res) => {
          setHorarios(res.data.agendas);
          setIsLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
  
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/agenda")
      .then((res) => {
        setHorarios(res.data.agendas);
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [setHorarios]);

 

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <div ref={agendarRef} id="agendar">
        <h3 className="flex justify-center mt-8 ml-8 mr-8 border-b-2 border-gray-300 pb-2">
          AGENDA
        </h3>
        <h3 className="flex justify-start mt-8 ml-8 mr-8  border-b-2 border-gray-300 pb-2 pl-4">
          HORA
        </h3>
        {horarios.map((agenda) => (
          <div
            className="flex justify-between border-b-2 border-gray-300 pb-2 pl-4 mt-8 ml-8 mr-8"
            key={agenda._id}
          >
            <h3 className="flex justify-start">{agenda.Hora} </h3>

            {agenda.NombreCliente !== "" ? (
              <h3 className="flex justify-center mr-4 text-[#FF7D00]">
                {agenda.UserId == UserId ? (
              <Button
              className="flex justify-center  bg-orange-500 rounded-lg text-black text-lg items-center"
              onClick={() => {
                setSelectedId(agenda._id); // Establecemos el ID de la agenda seleccionada
                setOpenModal(true);
              }}
            >
              MODIFICAR
            </Button>
            )  : (<Button disabled className="flex justify-center bg-gray-400 rounded-lg text-black text-lg items-center">
              RESERVADO
            </Button>)}
              </h3>
            ) : (
              <Button
                className="flex justify-center mr-4 bg-white rounded-lg text-black text-lg items-center"
                onClick={() => {
                  setSelectedId(agenda._id); // Establecemos el ID de la agenda seleccionada
                  setOpenModal(true);
                }}
              >
                AGENDAR
              </Button>
            )  
            }
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
                    {/* Pasamos el ID y la función onCloseModal al componente FormAgendar */}
                    <FormAgendar id={selectedId} onCloseModal={onCloseModal} refreshData={refreshData} getUserId = {getUserId} />
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
