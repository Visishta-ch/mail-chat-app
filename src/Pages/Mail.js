import React,{useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, Prompt } from 'react-router-dom';
import { mailActions } from '../store/mailStore-slice';
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
  // const [formactiveState, setFormActiveState] = useState(false)
 
  let [mailingTo, setMailingTo] = useState('');
  // console.log(props.text
  const sendMailToref = useRef();
  const subjectref = useRef();
  // const messageref = useRef();
  const senderMail = localStorage.getItem('userMail');
  let usermail;
  const regex = /[`@.`]/g;
  if (senderMail != null) {
    
    usermail = senderMail.replace(regex, '');

    console.log(usermail);
  }
  const editorState = EditorState.createEmpty();
  let message;
    const onEditorStateChange = (event) => {
      message = event.getCurrentContent().getPlainText();
  };

  // const stateActivateHandler = () => {
  //   setFormActiveState(true);
  //   console.log('focused')
  // }
  // const changePromptStateHandler = () => {
  //   setFormActiveState(false);
  // }
  const sendMailHandler = (e) => {
    e.preventDefault();
    const receiverMail = sendMailToref.current.value;
    const subject = subjectref.current.value;    
    const mailDetails = {
        senderMail,
        receiverMail,
        subject,
        message,
        read:false
      }
    setMailingTo(receiverMail)
    console.log(receiverMail);
    dispatch(authActions.setReceiverMail(receiverMail));
    console.log('mailing details: ', mailDetails);
    // sendMail(mailDetails);
    fetch(`https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Sentbox.json`,
    {
      method:'POST',
      body: JSON.stringify({
        // mail:receiverMail,
        // subject: subject,
        // message:message,
        // read:false
        mailDetails
      }),
      headers :{'Content-Type': 'application/json'}
    }).then((resp) => {
      if (resp.ok) {
        console.log("resp1", resp);
        dispatch(mailActions.storeInBox(mailDetails));
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
            dispatch(mailActions.storeInBox(mailDetails));
            return response.json()
            // existingInput.push(mailDetails);
            // setInput(existingInput);
          }
          else {
             return response.json()
            // alert('mailing error');
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
  

  return (
    <>
    
    <Nav />
    <div className={styles.container}>
      <form  onSubmit={sendMailHandler} className={styles.form}>
        <input type="email" placeholder="To " ref={sendMailToref} /> <br/>
        <input type="text" placeholder="Subject"  ref={subjectref} /> <br/>
        <div className={styles.editor}>
        {/* <TextEditor onEditorStateChange={onEditorStateChange} /> */}
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
        <button className={styles.btn} >Send</button>
      </form>
      </div>
    </>
  );
};

export default Mail;
