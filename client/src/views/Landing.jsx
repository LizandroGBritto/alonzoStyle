import Agenda from "../components/Agenda";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Servivcios from "../components/Servicios";
import { useState, useEffect, useRef } from "react";

const Landing = () => {
  const [horarios, setHorarios] = useState([]);
  const agendarRef = useRef(null);
  const footerRef = useRef(null);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const getUserId = () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = generateUUID();
      localStorage.setItem("userId", userId);
    }
    return userId;
  };

  useEffect(() => {
    const userId = getUserId();
    console.log("User ID:", userId);
  }, []);

  return (
    <>
      <div>
        <NavBar agendarRef={agendarRef} footerRef={footerRef} />
        <Servivcios />
        <Agenda horarios={horarios} setHorarios={setHorarios} getUserId={getUserId} agendarRef={agendarRef} />
        <Footer footerRef={footerRef} />
      </div>
    </>
  );
};

export default Landing;
