import React from 'react'
import styles from './Header.module.css'
import { BiMenu } from "react-icons/bi";
import logo from '../../images/logo.webp'
import { SlMagnifier } from "react-icons/sl";
import { IoMdApps } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";




const Header = () => {
  return (
    <>
        <div className={styles.header}>
            <div className={styles['header-left']}>
                <span className = {styles.spanIcon}> <BiMenu/> </span>
                <img src = {logo} alt='' className={styles.img}/>
            </div>
            <div className={styles['header-middle']}>
                <span className = {styles.spanIcon}><SlMagnifier /></span>
                <input type="text"  placeholder="search" className={styles.input} >
                
                </input>
            </div>
            <div className={styles['header-right']}>
                <span className = {styles.spanIcon}><IoMdApps/></span>
                <span className = {styles.spanIcon}><IoIosNotifications/></span>
                <span className = {styles.spanIcon}><BiUserCircle/></span>
            </div>
        </div>
    </>
  )
}

export default Header