import './App.css';
import Login from './Auth/login';
import Register from './Auth/register';
import Post from './Posters/Post';
import CreatePost from './Posters/createPost';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditPost from './Posters/EditPost';
import MyProfile from './Profile/MyProfile';
import Navbar from './Navbar/Navbar';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    validar()
  }, [])

  function validar(){
    if(localStorage.getItem('user')){
       return true;
    }else{
      return false
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar validar={validar} />
        <Routes>
          <Route index path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/feed' element={<Post />} />
          <Route path='/feed/:id' element={<Post />} />
          <Route path='/feed/new_post/:id' element={<CreatePost />} />
          <Route path='/feed/edit_post/:id' element={<EditPost />} />
          <Route path='/profile/:id' element={<MyProfile />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
