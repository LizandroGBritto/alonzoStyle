import { useState, useEffect } from 'react';
import Form from './Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import useForm from '../hooks/useForm';


const FormAgendar = ({ id, onCloseModal, refreshData, getUserId }) => {
  const IdUsuario = getUserId();
  const initialValues = {
    Hora: 'cargando...',
    NombreCliente: 'cargando...',
    NumeroCliente: 'cargando...',
    UserId: IdUsuario
  };

  console.log(initialValues);

  
  

  const { values: agenda, handleChange, setValues } = useForm(initialValues);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/agenda/${id}`)
        .then(res => {
          console.log('Respuesta de la API:', res); // Verificación de la respuesta
          if (res.data && res.data.agenda) {
            setValues({
              Hora: res.data.agenda.Hora || '',
              NombreCliente: res.data.agenda.NombreCliente || '',
              NumeroCliente: res.data.agenda.NumeroCliente || '',
              UserId: IdUsuario
            });
          } else {
            setValues({
              Hora: '',
              NombreCliente: '',
              NumeroCliente: '',
            });
            console.error('No se encontraron los datos');
          }
        })
        .catch(err => {
          console.log(err);
          setError('Ocurrió un error al cargar los datos');
        });
    }
  }, [id, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/agenda/${id}`, agenda)
      .then(res => {
        console.log(res);
        setError('');
        Swal.fire({
          icon: 'success',
          title: 'Excelente',
          text: `¡Tienes una cita a las ${agenda.Hora}!`,
        });
        refreshData(); // Actualizamos los datos
        onCloseModal(); // Cerramos el modal al enviar correctamente
      })
      .catch(err => {
        console.log(err);
        setError(err.response?.data?.error?.message || 'Ocurrió un error');
      });
  };

  return (
    <div>
      <div className="buyContainer" id="pedido">
        <div className="buyCard">
          <Form handleSubmit={handleSubmit} error={error} agenda={agenda} handleChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default FormAgendar;
