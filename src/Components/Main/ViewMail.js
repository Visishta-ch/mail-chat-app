import React from 'react'
import Nav from '../../Layout/Nav'
import Header from '../../Components/Header/Header'
import SideBar from './SideBar'
import styles from './ViewMail.module.css'
import {Link, useParams, useLocation} from 'react-router-dom';
import { TfiArrowLeft } from "react-icons/tfi";
import { BsTrash } from "react-icons/bs";
import mail from '../../images/mail.jpg'


const ViewMail = (props) => {
    console.log(props.item)
    const params = useParams();
    console.log(params)
    const loggedInUser = localStorage.getItem('userMail');
    const location = useLocation();
    const {senderMail, subject, message, id} = location.state;
    console.log(senderMail,subject,message,id);

    const deleteItem = (id) => {
        console.log('deleting item', id)
    }
  return (
    <div>
        <Nav/>
        <Header />
        <div className={styles['main-container']}>
            <SideBar />
            <div className={styles.viewSection}>
                <div className={styles.icon} >
                    <div><span><TfiArrowLeft/></span> <Link to='/welcome' className={styles.link}>Back</Link></div>
                   {/* <span><MdOutlineArrowBackIosNew/></span>  */}
                   <button className={styles.deletebtn} onClick={()=>deleteItem(id)}><BsTrash/></button>
                </div>
                <div className={styles['main-veiw-content']}>
                    <div className={styles['inner-container']}>
                    <div className={styles.mailtitle}>
                        <h3>{subject}</h3> 
                        <img src={mail} alt='' className={styles.mailImg}/>
                        <h2 className={styles.spanStyle}>{senderMail}</h2>
                        <p style={{fontSize:'12px'}}>{`<${senderMail}>`}</p>
                        </div>
                        <div className={styles.mailFormat}>
                           
                            <p>To: {loggedInUser} </p>
                        </div>
                        <p className={styles.msg}>{message}</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default ViewMail