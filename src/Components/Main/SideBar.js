import React from 'react'
import styles from './SideBar.module.css'
import { Link} from 'react-router-dom';
import { TfiPlus } from 'react-icons/tfi';
import { RiInboxLine } from 'react-icons/ri';
import { RiSendPlaneFill } from 'react-icons/ri';
import { SlArrowDown } from 'react-icons/sl';
// import { SlStar } from 'react-icons/sl';
import { SlPhone } from 'react-icons/sl';
import { SlUser } from 'react-icons/sl';
import { MdOutlineDuo } from 'react-icons/md';


const SideBar = ({count, selected}) => {
  console.log('count from main to sidebar', count)

  return (
    <>
         <div className={styles.sidebar}>
        <Link to="/mail" className={styles['sidebar-btn']}>
          <span>
            <TfiPlus />
          </span>
          Compose
        </Link>

        <div className={styles['options-list1']}>
        <div style={{display:'flex'}}>
          <span className={styles['sidebar-icons']}>
            <RiInboxLine />
          </span>

          <Link to='/welcome' className={styles.listbtn}   activeClassName = {styles.active}>
            {/* <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}> */}
            <h3 className={styles.heading3}>Inbox </h3>
           {/* <span style={{backgroundColor:'#ccc', }}> {count}</span> */}
           {/* </div> */}
          </Link>
          </div>
          <span></span>
          <span className={styles.count}> {count}</span>
        </div>
        <div className={styles['options-list']}>
          <span className={styles['sidebar-icons']}>
            <RiSendPlaneFill />
          </span>
          <Link to="/Sentbox" className={styles.listbtn}>
            <h3 className={styles.heading3}>Sent</h3>
          </Link>
        </div>
        <div className={styles['options-list']}>
          <span className={styles['sidebar-icons']}>
            <SlArrowDown />
          </span>
          <button className={styles.listbtn}>
            <h3 className={styles.heading3}>More</h3>
          </button>
        </div>

        <div className={styles.footer}>
          <span className={styles['footer-icons']}>
            <SlUser />
          </span>
          <span className={styles['footer-icons']}>
            <SlPhone />
          </span>
          <span className={styles['footer-icons']}>
            <MdOutlineDuo />
          </span>
        </div>
      </div>

    </>
  )
}

export default SideBar