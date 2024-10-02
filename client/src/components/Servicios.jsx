import img1 from "../assets/img1.svg";
import img2 from "../assets/img2.svg";
import img3 from "../assets/img3.svg";
const Servivcios = () => {
  return (
    <>
      <div className="servicios-main">
        <h3
          className="flex justify-center mt-5 ml-8 mr-8 border-b-2 border-gray-300 pb-2"
          id="servicios"
        >
          SERVICIOS
        </h3>
        <div className="servicios-container flex mt-8 justify-evenly items-center">
          <div className="flex-col">
            <img src={img1} className="rounded-lg w-40" alt="" />
            <h3 className="flex justify-center mt-8">TE CUIDAMOS</h3>
            <h3 className="flex justify-center mb-8 text-[#FF7D00]">
              Y CUIDAMOS
              <br />
              TU IMAGEN
            </h3>
            <img src={img3} className="rounded-lg w-40" alt="" />
          </div>
          <div className="flex-col justify-around items-center">
            <h3 className="flex justify-center mt-8">ENCONTRAMOS</h3>
            <h3 className="flex justify-center mb-8 text-[#FF7D00]">
              EL ESTILO QUE
              <br />
              SE ADAPTE A TI
            </h3>
            <img src={img2} className="rounded-lg w-40" alt="" />
            <h3 className="flex justify-center mt-8">SERVICIOS DE</h3>
            <h3 className="flex justify-center mb-8 text-[#FF7D00]">
              CALIDAD CON
              <br />
              RESULTADOS <br />
              DE CALIDAD
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Servivcios;
