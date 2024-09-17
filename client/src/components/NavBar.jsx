import DownButton from "../assets/DownButton.svg";
import logoCenter from "../assets/logoCenter.svg";
import backImg from "../assets/background1.svg";

const NavBar = ({agendarRef}) => {

  const scrollToAgendar = () => {
    if (agendarRef.current) {
      agendarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div
      className="bg-cover bg-center  h-96"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="navBar flex justify-evenly items-center" id="home">
        <div className="iconD ml-2">
          <ol className="flex items-center space-x-4">
          <li className="flex items-center">
              Contactame
              <img
                src={DownButton}
                alt="Down Button"
                className="ml-1 w-4 h-4"
              />
            </li>
          </ol>
        </div>
        <div className="flex">
          <img src={logoCenter} alt="Logo Center" className="w-10 " />
        </div>
        
        <div className="iconI mr-2">
          <ol className="flex items-center space-x-4">
            <li className="flex items-center">
              Ubicación
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
        <h2 className="text-4xl tracking-[0.05em] ">ALONZO STYLE</h2>
        <h3 className="tracking-[0.5em] mt-2 mb-2">CREANDO TU ESTILO</h3>
        <button className="bg-[#FF7D00] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"  onClick={scrollToAgendar}>
          RESERVAR TURNO
        </button> 
      </div>
    </div>
  );
};

export default NavBar;
