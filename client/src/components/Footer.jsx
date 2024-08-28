import Location from '../assets/Location on.svg'
import Maps from '../assets/Google Maps Old.svg'
import Whatsapp from '../assets/Whatsapp.svg'
import Instagram from '../assets/Instagram.svg'
const Footer = () => {
  return (
    <>
        <div className="flex justify-evenly items-center mb-3">
        <div className="">
            <h3 className="flex justify-center mt-8 ml-8 mr-8 border-b-2 border-gray-300 pb-2 pl-4 pr-4">UBICACION</h3>
            <div className="flex justify-center items-baseline ">
                <img src={Location} alt="Location" className='mr-1' />
                <p className="flex justify-center ">14 de Mayo entre <br />
                General Artigas y <br />
                Juan Leon Mallorquin
                </p>
            </div>
            <div className="flex justify-center items-baseline mt-2 mr-2">
            <img src={Maps} alt="Location" className='mr-1' />
                <p className="flex justify-center text-[#FF7D00]"> Toca Aqui para ver en
                 <br />
                 Google Maps
                </p>
            </div>
        </div>
        <div className="">
        <h3 className="flex justify-center mt-8 ml-8 mr-8 border-b-2 border-gray-300 pb-2 pl-4 pr-4">CONTACTO</h3>
        <div className="flex justify-center items-baseline">
        <img src={Whatsapp} alt="Location" className='mr-1' />
        <p className="flex justify "> 
                    +595 983 974 440
                </p>
        </div>
        <div className="flex justify-center items-baseline mt-10 mb-9">
        <img src={Instagram} alt="Location" className='mr-1' />
                <p className="flex justify"> 
                    @Alonzo_Style
                </p>
        </div>
        </div>
        </div>
        <div className="bg-white">
            <h6 className='text-black flex justify-center text-xs'>© 2024 Alonzo Style. Todos los derechos reservados.</h6>
        </div>
        
    </>
  )
}

export default Footer