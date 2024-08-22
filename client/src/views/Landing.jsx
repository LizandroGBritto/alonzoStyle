import Agenda from "../components/Agenda"
import NavBar from "../components/NavBar"
import Servivcios from "../components/Servivcios"
import { useState } from 'react'
const Landing = () => {
  const [horarios, setHorarios] = useState([])


  return (
    <>
    <NavBar/>
    <Servivcios/>
    <Agenda horarios = {horarios} setHorarios = {setHorarios}/>
    </>
  )
}

export default Landing