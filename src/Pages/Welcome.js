import React from 'react'

import styles from './Welcome.module.css'
import {useDispatch} from 'react-redux'
import { authActions } from '../store/auth-slice'
import Nav from '../Layout/Nav'
import Header from '../Components/Header/Header'
import Main from '../Components/Main/Main'

const Welcome = () => {
  const dispatch = useDispatch();
  
  dispatch(authActions.isLoginAuthenticated());
  
  return (
    <div>
        
        <Nav/>
        <Header/>
        <Main />
         <div className={styles.mail}> 

        </div> 
    </div>
  )
}

export default Welcome