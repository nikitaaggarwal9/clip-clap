import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login'
import Feed from './Components/Feed'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import OthersProfile from './Components/OthersProfile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route exact path='/profile/:id' element={(<PrivateRoute><Profile/></PrivateRoute>)}></Route>
          <Route exact path='/profile/:id/:id2' element={(<PrivateRoute><OthersProfile/></PrivateRoute>)}></Route>
          <Route exact path='/' element={(<PrivateRoute><Feed/></PrivateRoute>)}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
