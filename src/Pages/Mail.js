import React,{useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, Prompt } from 'react-router-dom';

import {authActions} from '../store/auth-slice'
import { Editor } from 'react-draft-wysiwyg';
import {EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Nav from '../Layout/Nav';
import './editor.css';

import styles from './Mail.module.css'

const Mail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [msg,setMsg] = useState('')
  const [formactiveState, setFormActiveState] = useState(false)
  let [mailingTo, setMailingTo] = useState('');
  const sendMailToref = useRef();
  const subjectref = useRef();
  const senderMail = localStorage.getItem('userMail');
  let usermail;
  const regex = /[`@.`]/g;

  const focusedHandler = () => {
    setFormActiveState(true);
  }
  if (senderMail != null) {
    
    usermail = senderMail.replace(regex, '');

    console.log(usermail);
  }
  const editorState = EditorState.createEmpty();
  let message;
  
    const onEditorStateChange = (event) => {
      message = event.getCurrentContent().getPlainText();
      // message = event.getCurrentContent()
      console.log(message);
      setMsg(message);
      // msg = message;
      // console.log(msg);
  };

  console.log(message);

  const sendMailHandler = (e) => {
    e.preventDefault();
    const receiverMail = sendMailToref.current.value;
    const subject = subjectref.current.value;   
    
    const mailDetails = {
        senderMail,
        receiverMail,
        subject,
        msg,
        read:false
      }
      console.log(mailDetails);
    setMailingTo(receiverMail)
    console.log(receiverMail);
    dispatch(authActions.setReceiverMail(receiverMail));
    console.log('mailing details: ', mailDetails);
    // sendMail(mailDetails);
    fetch(`https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Sentbox.json`,
    {
      method:'POST',
      body: JSON.stringify({
          mailDetails
      }),
      headers :{'Content-Type': 'application/json'}
    }).then((resp) => {
      if (resp.ok) {
        console.log("resp1", resp);
        
        return resp.json();
      } else {
        return resp.json().then((data) => {
          console.log(data);
        });
      }
    })
    .then((data) => {
      console.log(data.name);
      console.log("Mail sent successfully...")
        history.push("/welcome");
    })
    .catch((err) => {
      alert(err);
    });

    let mailTo = receiverMail.replace(regex, '');
    console.log('mailing to:',mailTo)

    fetch(`https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${mailTo}Inbox.json`,
    {
          method: 'POST',
          body: JSON.stringify(
            mailDetails
          ),
          headers :{'Content-Type': 'application/json'} 
        }).then((response) => {
          if(response.status === 200){
            console.log('mailing success');
             return response.json()
            
          }
          else {
             return response.json()
          }
        }).then((data) => {
          console.log('data sent successfully',data);
          // alert("Mail sent successfully...")
           history.replace("/welcome");
                 })
        .catch((err) => {
          alert(err);
        }); 
        
 
    
  }
   console.log('mailed to: ', mailingTo)
  
   const doneEnteringHandler = () => {
      setFormActiveState(false);
   }

  return (
    <>
    
    <Nav />
    <div className={styles.container}>
    <Prompt when={formactiveState} message={(location)=> "Do you really want to leave the Page...All the data entered will be lost "}/>
      <form  onSubmit={sendMailHandler} className={styles.form} onFocus={focusedHandler}>
        <input type="email" placeholder="To " ref={sendMailToref} /> <br/>
        <input type="text" placeholder="Subject"  ref={subjectref} /> <br/>
        <div className={styles.editor}>
    
        <Editor
          EditorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            // position: { top: 'auto', bottom: '10px' },
          }}
          onEditorStateChange={onEditorStateChange}
          
        />
         {/* <button className={styles.btn}>Send</button> */}

        </div>
        <button className={styles.btn} onClick={doneEnteringHandler}>Send</button>
      </form>
      </div>
    </>
  );
};

export default Mail;
