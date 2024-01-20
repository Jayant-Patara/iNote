import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Userdata from './components/Userdata';

function App() {
  const [alert,setAlert] =useState(null);
  const showalert=(message,type)=>{
    setAlert({
          msg: message,
          type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
      <div className="container">
    <Routes>
          <Route exact path="/" element={
          <Home showalert={showalert}/>
          }/>
          <Route exact path="/about" element={
          <About/>
          }/>
          <Route exact path="/login" element={
          <Login showalert={showalert}/>
          }/>
          <Route exact path="/signup" element={
          <Signup showalert={showalert}/>
          }/>
          <Route exact path="/userdetail" element={
              <Userdata/>
          }/>
          </Routes>
          </div>
    </Router>
    </NoteState>

  );
}
export default App;
