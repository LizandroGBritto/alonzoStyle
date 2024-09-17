import './App.css'
import Landing from './views/Landing'
import { Route, Routes, Navigate } from 'react-router-dom';
import UserContext from './context/UserContext';
import { useState } from 'react';
import Admin from './views/Admin';
import Login from './views/Login';


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
        <Route path="/admin" element={user ? <Navigate to="/admin/panel" /> : <Login />} />
        <Route path="/admin/panel" element={user ? <Admin user={user} setUser={setUser} /> : <Navigate to="/admin" />} />
    </Routes>
</UserContext.Provider>
</>
)
}

export default App