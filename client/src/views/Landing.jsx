import Agenda from "../components/Agenda"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import Servivcios from "../components/Servicios"
import { useState, useEffect, useRef } from 'react'

const Landing = () => {
  const [horarios, setHorarios] = useState([])

  const agendarRef = useRef(null);
 
  
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Función para obtener o crear un userId único
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = generateUUID();  // Si no existe, genera un nuevo UUID
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  // useEffect para ejecutar la función cuando el componente se monte
  useEffect(() => {
    const userId = getUserId();
    console.log('User ID:', userId); // Verificación del userId en la consola
  }, []); // El array vacío asegura que esto se ejecute solo una vez


  console.log(getUserId());

  return (
    <>
    <div>
      <NavBar agendarRef={agendarRef} />
      <div className="">
        <Servivcios/>
        <Agenda horarios = {horarios} setHorarios = {setHorarios} getUserId = {getUserId} agendarRef={agendarRef} />
        <Footer/>
      </div>
    </div>
    </>
  )
}

export default Landing