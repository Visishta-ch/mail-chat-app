import React from 'react'
import Nav from '../../Layout/Nav'
import Header from '../../Components/Header/Header'
import SideBar from './SideBar'
import styles from './ViewMail.module.css'
import {Link, useParams, useLocation, useHistory} from 'react-router-dom';
import { TfiArrowLeft } from "react-icons/tfi";
import { BsTrash } from "react-icons/bs";
import mail from '../../images/mail.jpg'
import { useSelector } from 'react-redux';



const ViewMail = (props) => {
    console.log(props.item)
    const history = useHistory();
    const params = useParams();
    console.log(params)
    const count = useSelector(state=> state.mail.count);
    const loggedInUser = localStorage.getItem('userMail');
    const location = useLocation();
    const {senderMail, subject, message, id} = location.state;
    console.log(senderMail,subject,message,id);
    const loggedInMail = localStorage.getItem('userMail');
    let usermail;
    // const [count, setCount] = useState(0);
    const regex = /[`@.`]/g;
    if (loggedInMail != null) {
      usermail = loggedInMail.replace(regex, '');
    }
   

    const deleteItem = (id) => {
        console.log('deleting item', id)
        fetch(`https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Inbox/${id}.json`,
        {
            method:'DELETE',

        }).then((response) => {
            response.json().then((res)=>{
                console.log('deleting item');
                alert('Are you sure? ')
            })
        }).catch(error=> {
            alert(error)
        })
        history.replace('/welcome')


    }
  return (
    <div>
        <Nav/>
        <Header />
        <div className={styles['main-container']}>
            <SideBar count={count}/>
            <div className={styles.viewSection}>
                <div className={styles.icon} >
                    <div className={styles.backbtn}><span><TfiArrowLeft/></span> <Link to='/welcome' className={styles.link}>Back</Link></div>
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