import React,{useEffect} from 'react';
import { Redirect, Switch, useLocation, Route } from "react-router-dom";
import SignIn from './pages/Study/SignIn'
import SignUp from './pages/Study/SignUp'
import Main from './pages/Study/Main'
import * as Cookies from 'js-cookie'

import {tokenStateApi} from './pages/Study/api'

const App:React.FC = () => {
  let location = useLocation();

  const [state,setState] = React.useState(false)
  
  const token = Cookies.get("x_auth");

  const tokenState = async () => {
    if (token === undefined) {
    }
    const response = await tokenStateApi(token);
    if (response.status === "success") {
        setState(true);
    } else if (response.message === "SignTokenInvalid") {
      // alert("토큰이 만료되어 로그아웃 됩니다");
      setState(false)
      Cookies.remove("x_auth");
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    tokenState();
  }, [location]);
  return (
    <div className="App" >
      <Switch>
        <div id="wrap">
          <Redirect path="*" to="/main" />
          
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignIn} />
          <Route exact path="/main" component={Main} />
        </div>
      </Switch>
    </div>
  );
}

export default App;
