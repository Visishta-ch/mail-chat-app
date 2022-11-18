import React,{useEffect} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../src/store/auth-slice';
import Login from '../src/Layout/Login';
import SignUp from '../src/Layout/SignUp';
import Welcome from '../src/Pages/Welcome';
import Mail from '../src/Pages/Mail';
import Inbox from './Components/Inbox';
import ViewMail from './Components/Main/ViewMail';
import SentboxVeiw from './Components/Main/SentboxVeiw';
import ForgetPassword from './Layout/ForgetPassword';

function App() {
  const dispatch = useDispatch();
  dispatch(authActions.isLoginAuthenticated());
  // dispatch(authActions.setUserMail())

  const isLogin = useSelector((state) => state.auth.isLogin);
  const mail = useSelector((state) => state.auth.userMail);
  console.log("login mail ",mail);
  console.log('isLogin', isLogin);
  // const token = localStorage.getItem('tokenId')


  return (
    <>
      <Switch>
        <Route path="/welcome/veiwMail/:id">
          <ViewMail />
        </Route>
        <Route path="/welcome/SentboxVeiw/:id">
          <SentboxVeiw />
        </Route>
        <Route path="/" exact>
          {!isLogin && <SignUp />}
          {isLogin && <Redirect to = '/welcome'>
              {/* <Welcome /> */}
          </Redirect>
          }
        </Route>
        {!isLogin && (
          <Route path="/welcome" >
            <Redirect to="/Login" />
          </Route>
        )}

        <Route path="/Login">
          <Login />
        </Route>
        
          <Route path="/welcome">
            <Welcome />
          </Route>
        
        {isLogin && (
          <Route path="/mail">
            <Mail />
          </Route>
        )}

        {!isLogin && (
          <Route path="/mail">
            <Login />
          </Route>
        )}
        {isLogin && (
          <Route path="/Sentbox">
            <Inbox />
          </Route>
        )}
        {!isLogin && (
          <Route path="/Sentbox">
            <Redirect to="/Login" />
          </Route>
        )}

        <Route path="/forgetPassword">
          <ForgetPassword />
        </Route>
        <Route path="*">
          <Redirect to="/Login">
            <Login />
          </Redirect>
        </Route>
      </Switch>
    </>
  );
}

export default App;
