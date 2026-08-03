import React, { useEffect } from 'react'
import Navbar from './Navbar'
import {Outlet, useNavigate} from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constant';



const Body = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userData = useSelector((store) => store.user);



  const fetchUsers = async ()=> {
    try{

      if (userData) return
    
    const res = await axios.get( BASE_URL+"/profile",  { withCredentials: true });

    dispatch(addUser(res.data));


    
    } catch(err){
      navigate("/login")
      console.log(err);
    }


  }




  useEffect(()=> {
    fetchUsers();
  },[])



  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body