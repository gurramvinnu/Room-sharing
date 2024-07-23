import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './loginpage';
import MainApp from './MainApp';
import SignupPage from './SignupPage';

const App = () => {
//    const [roomId, setRoomId] = useState('');

//     useEffect(() => {
//         const room_id = localStorage.getItem('room_id'); 
//         setRoomId(room_id); 
//     }, []);
    
    // useEffect(() => {
    //     // window.location.href = '/login'; 
    // }, [roomId==null]);
   
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/SignupPage" element={<SignupPage />} />
                <Route path="/*" element={<MainApp />} />
            </Routes>
        </Router>
    );
};

export default App;
