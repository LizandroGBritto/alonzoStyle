import './App.css'
import Landing from './views/Landing'
import { Route, Routes } from 'react-router-dom';
import UserContext from './context/UserContext';
import { useState } from 'react';


const App = () =>{

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(userDetails || null);
    
    const setUserKeyValue = (clave, valor) => {
        setUser({
          ...user,
          [clave]: valor,
        });
      };
    
      const objetContext = {
        user,
        setUser,
        setUserKeyValue,
      };

return(
<>
<UserContext.Provider value={objetContext}>
    <Routes>
        <Route path='/' element={<Landing />} />
 
    </Routes>
</UserContext.Provider>
</>
)
}

export default App