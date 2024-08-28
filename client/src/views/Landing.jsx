import Agenda from "../components/Agenda"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import Servivcios from "../components/Servicios"
import { useState } from 'react'

const Landing = () => {
  const [horarios, setHorarios] = useState([])
 



  return (
    <>
    <div>
      <NavBar/>
      <div className="">
        <Servivcios/>
        <Agenda horarios = {horarios} setHorarios = {setHorarios}/>
        <Footer/>
      </div>
    </div>
    </>
  )
}

export default Landing