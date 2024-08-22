import axios from 'axios';
import Swal from 'sweetalert2';
import useForm from '../hooks/useForm';
import { useState, useEffect } from 'react';

const Agenda = ({horarios, setHorarios}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/agenda')
            .then(res => {
                setHorarios(res.data.agendas)
                setIsLoading(false)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [setHorarios])

    if (isLoading) return <h1>Loading...</h1>;


  return (
    <div>
      <h3  className="flex justify-center mt-8 ml-8 mr-8 border-b-2 border-gray-300 pb-2" >AGENDA</h3>  
      <h3  className="flex justify-start mt-8 ml-8 mr-8  border-b-2 border-gray-300 pb-2 pl-4" >HORA</h3>  
        {horarios.map(agenda => (
            <div className="flex justify-between border-b-2 border-gray-300 pb-2 pl-4 mt-8 ml-8 mr-8" key={agenda._id}>
            <h3  className="flex justify-start" >{agenda.Hora}  </h3>  <button className='flex justify-center mr-4 bg-white rounded-lg text-black  text-lg pl-4 pr-4 items-center '>AGENDAR</button>
           
            </div>
        ))}
    </div>
  )
}

export default Agenda