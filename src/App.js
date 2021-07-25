import React from 'react';
import {NavBar} from './NavBar';
import {Route, Switch, HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import HomePage from './Home';
const theme = createTheme({
  palette: {
    primary: {
      main: yellow[800],
    }
  },
});


function App() {
  return (
    <ThemeProvider theme = {theme}>
    <HashRouter>
    <NavBar/>
    <main >
    <Switch>
      <Route exact path = "/"> <HomePage /> </Route>
      <Route exact path = "/Blogs"> <h1>Blogs</h1></Route>
    </Switch>
    </main>
    </HashRouter>
    </ThemeProvider>
  );
}

export default App;
