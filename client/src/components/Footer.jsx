import Location from "../assets/Location on.svg";
import Maps from "../assets/Google Maps Old.svg";
import Whatsapp from "../assets/Whatsapp.svg";
import Instagram from "../assets/Instagram.svg";

const Footer = ({ footerRef }) => {
  return (
    <>
      <div ref={footerRef} className="flex justify-evenly items-center mb-3">
        <div className="">
          <h3 className="flex justify-center mt-8 ml-8 mr-8 border-b-2 border-gray-300 pb-2 pl-4 pr-4">
            UBICACION
          </h3>
          <div className="flex justify-center items-baseline ">
            <img src={Location} alt="Location" className="mr-1" />
            <p className="flex justify-center ">
              14 de Mayo entre <br />
              General Artigas y <br />
              Juan Leon Mallorquin
            </p>
          </div>
          <div className="flex justify-center items-baseline mt-2 mr-2">
            <a
            className="flex"
            href="https://www.google.com/maps/place/Athenea+barber/@-27.332987,-55.8682439,15z/data=!4m6!3m5!1s0x9457954e1df7a6cf:0xf001b113ec425db9!8m2!3d-27.332987!4d-55.8682439!16s%2Fg%2F11pcmtpksc?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D"
            >
                <img src={Maps} alt="Location" className="mr-1" />
                 <p className="flex justify-center text-[#FF7D00]">
              Toca Aquí para ver en
              <br />
              Google Maps
            </p>
            </a>
           
          </div>
        </div>
        <div className="">
          <h3 className="flex justify-center mt-8 ml-8 mr-8 border-b-2 border-gray-300 pb-2 pl-4 pr-4">
            CONTACTO
          </h3>
          <div className="flex justify-center items-baseline">
            <a
              href="https://wa.me/595983974440"
              target="_blank"
              rel="noopener noreferrer"
              className="flex"
            >
              <img src={Whatsapp} alt="Whatsapp" className="mr-1" />
          
            <p className="flex">+595 983 974 440</p>
            </a>
          </div>

          <div className="flex justify-center items-baseline mt-10 mb-9">
            <a
            className="flex"
              href="https://instagram.com/Alonzo_Style"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="Instagram" className="mr-1" />
            <p className="flex justify">@Alonzo_Style</p>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <h6 className="text-black flex justify-center text-xs">
          © 2024 Alonzo Style. Todos los derechos reservados.
        </h6>
      </div>
    </>
  );
};

export default Footer;
