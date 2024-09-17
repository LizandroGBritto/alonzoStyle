import { Button } from "flowbite-react";
import * as Yup from 'yup';
import { ErrorMessage, Formik, Field, Form } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const LoginForm = ({ formType }) => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
        if (formType === 'Registrarse') {
            registerUser(values, setErrors);
        } else {
            loginUser(values, setErrors);
        }
        setSubmitting(false);
        resetForm();
    };

    const registerUser = async (values, setErrors) => {
        try {
            await axios.post(
                "http://localhost:8000/api/auth/register",
                {
                    userName: values.userName,
                    password: values.password
                },
                { withCredentials: true }
            );
            loginUser(values, setErrors);
        } catch (err) {
            console.log("Error: ", err.response);
            setErrors({ general: err.response?.data?.msg || 'Error desconocido' });
        }
    };

    const loginUser = async (values, setErrors) => {
        try {
            let res = await axios.post(
                "http://localhost:8000/api/auth/login",
                {
                    userName: values.userName,
                    password: values.password
                },
                { withCredentials: true }
            );
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/admin/panel");
        } catch (err) {
            console.log("Error: ", err.response);
            setErrors({ general: err.response?.data?.msg || 'Error desconocido' });
        }
    };

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("Usuario es requerido"),
        password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required("Contraseña es requerida"),
        ...(formType === 'Registrarse' ? {
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required("Confirme la contraseña")
        } : {})
    });

    return (
        <Formik
            initialValues={{
                userName: '',
                password: '',
                ...(formType === 'Registrarse' ? { confirmPassword: '' } : {})
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, errors }) => (
                <>
                    <Form>
                        <h2 className="text-pretty font-semibold text-white mb-3">{formType === "Iniciar Sesion" ? "Iniciar Sesion" : "Registrarse"}</h2>
                        {errors?.general && <div className="text-red-600">{errors.general}</div>}

                        <div className="mb-5">
                            <Field type="text" name='userName' className='text-zinc-950' placeholder='Nombre de Usuario' />
                            <ErrorMessage name='userName' component='div' className="text-red-600" />
                        </div>

                        <div className="mb-5">
                            <Field type="password" name='password' className='text-zinc-950' placeholder='Contraseña' />
                            <ErrorMessage name='password' component='div' className="text-red-600" />
                        </div>
                        {formType === 'Registrarse' && (
                            <div className="mb-5">
                                <Field type="password" name='confirmPassword' placeholder='Confirmar Contraseña' />
                                <ErrorMessage name='confirmPassword' component='div' className="text-red-600" />
                            </div>
                        )}

                        <Button className="bg-orange-600" type="submit" disabled={isSubmitting}>Entrar</Button>
                    </Form>
                </>
            )}
        </Formik>
    );
};

export default LoginForm;
