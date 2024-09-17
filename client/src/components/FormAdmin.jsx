import { useState } from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const FormAdmin = ({ handleSubmit, agenda, getUserId, error }) => {
  const [isCancelling, setIsCancelling] = useState(false);

  const validationSchema = Yup.object().shape({
    NombreCliente: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'El nombre no debe contener caracteres especiales ni números')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('El nombre es obligatorio'),
    NumeroCliente: Yup.string()
      .matches(/^09\d{8}$/, 'El número debe tener el formato 09XXXXXXXX')
      .required('El número es obligatorio')
      .test(
        'is-unique',
        'Este número ya está registrado en otra cita',
        async (value) => {
          if (agenda.UserId === getUserId()) return true; 
          if (!value) return true;
          try {
            const response = await axios.get("http://localhost:8000/api/agenda");
            const exists = response.data.agendas.some(
              (agenda) => agenda.NumeroCliente === value
            );
            return !exists; // si el número existe, devuelve false para invalidar el campo
          } catch (error) {
            console.error('Error al verificar el número:', error);
            return false; // Devuelve false en caso de error para invalidar el campo
          }
        }
      ),
  });

  const initialValues = {
    NombreCliente: agenda.NombreCliente || '',
    NumeroCliente: agenda.NumeroCliente || '',
    UserId: agenda.UserId || '',
    Hora: agenda.Hora || '',
  };

  return (
    <>
      <div className="text-danger">{error}</div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={!isCancelling ? validationSchema : null}
        onSubmit={(values, { setSubmitting }) => {
          if (isCancelling) {
            values.Hora = agenda.Hora;
            values.NombreCliente = '';
            values.NumeroCliente = '';
            values.UserId = '';
          } else {
            values.Hora = agenda.Hora;
          }
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <FormikForm className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="NombreCliente" className="block text-sm font-medium leading-6 text-gray-900">
                    Tu nombre
                  </label>
                  <div className="mt-2">
                    <Field
                      id="NombreCliente"
                      name="NombreCliente"
                      type="text"
                      autoComplete="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="NombreCliente" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="NumeroCliente" className="block text-sm font-medium leading-6 text-gray-900">
                    Tu número de celular
                  </label>
                  <div className="mt-2">
                    <Field
                      name="NumeroCliente"
                      type="text"
                      id="NumeroCliente"
                      autoComplete="phone-number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="NumeroCliente" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Confirmar Cita
                </button>

                {agenda.UserId && (
                  <button
                    type="submit" // Cambiar a "button" para evitar el envío del formulario
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => {
                      setIsCancelling(true); // Activar el estado de cancelación para omitir la validación
                    }}
                  >
                    Cancelar Cita
                  </button>
                )}
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default FormAdmin;
