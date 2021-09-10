import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import "./App.css";
import SignUp from "./Components/UserAuth/SignUp";
import Login from "./Components/UserAuth/Login";
import MyAccount from "./Components/MyAccount/MyAccount";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import ResetPass from "./Components/UserAuth/ResetPass";
import passwordSendMessage from "./Components/UserAuth/PasswordSendMessage";

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [themeToggler, setThemeToggler] = useState(true);

  const themeHandler = () => {
    if (themeToggler) {
      setThemeToggler(false);
      setTheme(lightTheme);
    } else {
      setThemeToggler(true);
      setTheme(darkTheme);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Dashboard
                    themeHandler={themeHandler}
                    themeToggler={themeToggler}
                  />
                )}
              />
              <AuthRoute exact path="/signup" component={SignUp} />
              <AuthRoute exact path="/login" component={Login} />
              <Route exact path="/resetPass" component={ResetPass} />
              <Route
                exact
                path="/passSendMessage"
                component={passwordSendMessage}
              />
              <Route exact path="/myAccount" component={MyAccount} />
            </Switch>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
