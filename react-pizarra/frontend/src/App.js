import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from "./Login/Login";
import Main from "./Main/Main";
import Board from "./Board/Board";

const App = (props) => (
    <BrowserRouter>
        <Switch>
            <Route
                exact path="/login"
                component={Login}
            />
            {
                (props.isAuth) ?
                    <>
                        <Route
                            exact path="/"
                            component={Main}
                        />
                    </>
                    :
                    <Redirect to="/login"/>
            }
        </Switch>
    </BrowserRouter>
)

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth
    }
};

export default connect(mapStateToProps, null)(App);

/*const App = (props) => (
    <BrowserRouter>
      <Switch>
        <Route
            exact path="/login"
            component={Login}
        />
        {
          (props.isAuth) ?
              <Layout>
                <Switch>
                  <Route
                      exact path="/"
                      component={Inicio}
                  />
                  <Route
                      exact path="/pacientes"
                      component={Pacientes}
                  />
                  <Route
                      exact path="/pacientes/:id"
                      component={Paciente}
                  />
                  <Route
                      exact path="/dietas"
                      component={Dietas}
                  />
                  <Route
                      exact path="/dietas/:id"
                      component={Dieta}
                  />
                  <Route component={NotFound}/>
                </Switch>
              </Layout>
              :
              <Redirect to="/login"/>
        }
      </Switch>
    </BrowserRouter>

);*/