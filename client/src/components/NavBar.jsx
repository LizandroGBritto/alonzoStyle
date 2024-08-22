import DownButton from "../assets/DownButton.svg";
import logoCenter from "../assets/logoCenter.svg";
import backImg from "../assets/background1.svg";

const NavBar = () => {
  return (
    <div
      className="bg-cover bg-center  h-96"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="navBar flex justify-evenly items-center" id="home">
        <div className="iconD ml-1">
          <ol className="flex items-center space-x-4">
            <li className="flex items-center">
              Home
              <img
                src={DownButton}
                alt="Down Button"
                className="ml-1 w-4 h-4"
              />
            </li>
            <li className="flex items-center">
              Servicios
              <img
                src={DownButton}
                alt="Down Button"
                className="ml-1 w-4 h-4"
              />
            </li>
          </ol>
        </div>
        <img src={logoCenter} alt="Logo Center" className="w-14 h-auto" />
        <div className="iconI">
          <ol className="flex items-center space-x-4">
            <li className="flex items-center">
              Contacto
              <img
                src={DownButton}
                alt="Down Button"
                className="ml-1 w-4 h-4"
              />
            </li>
            <li className="flex items-center">
              Ubicacion
              <img
                src={DownButton}
                alt="Down Button"
                className="ml-1 w-4 h-4"
              />
            </li>
          </ol>
        </div>
      </div>
      <div className="flex items-center flex-col mt-48 bg-black bg-opacity-50 p-6">
        <h2 className="text-5xl ">ALONZO STYLE</h2>
        <h3 className="tracking-[0.5em] mt-2 mb-2">CREANDO TU ESTILO</h3>
        <button className="bg-[#FF7D00] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105">
          RESERVAR TURNO
        </button> 
      </div>
    </div>
  );
};

export default NavBar;