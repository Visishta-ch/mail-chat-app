import React,{ useEffect} from 'react'

// import styles from './Welcome.module.css'
import {useDispatch,useSelector} from 'react-redux'
import { authActions } from '../store/auth-slice'
import Nav from '../Layout/Nav'
import Header from '../Components/Header/Header'
import Main from '../Components/Main/Main'

const Welcome = () => {
  const dispatch = useDispatch();
   const mail = useSelector(state=>state.auth.userMail)
   console.log(mail)
  dispatch(authActions.isLoginAuthenticated()); 
  

  return (
    <>
        
        <Nav/>
        <Header/>
        <Main />
        
    </>
  )
}

export default Welcome