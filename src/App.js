import { ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid,  Switch } from '@mui/material';
import { withStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';
import { useState } from "react";
import React from 'react'

import theme from "./theme"
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './components/home/home.component'
import Definition from './components/definition/definition.component'
import Bookmarks from './components/bookmarks/bookmarks.component'
import NewWord from './components/newWord/newWord.component'

const App = () => {
  const [LightTheme, setLightTheme] = useState(true);

  const PurpleSwitch = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    // we are wrapping entire app
    <div
    className="App"
    style={{
      backgroundColor: LightTheme ? "#F1F1FD" : "#12131D",
      color: LightTheme ? "#402548" : "white",
      transition: "all 0.5s linear"
    }}
  >
    <ThemeProvider theme= {theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} sx={{ p:2 }}>

        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{LightTheme ? "Dark" : "Light"} Mode</span>
          <PurpleSwitch
            checked={LightTheme}
            onChange={() => setLightTheme(!LightTheme)}
          />
        </div>


      <Router>
        <Route exact path='/' component={Home} />
        <Route path='/search/:word' component={Definition} />
        <Route path='/bookmarks' component={Bookmarks} />
        <Route path='/new' component={NewWord} />
      </Router>
      </Grid>
      </Grid>
    </ThemeProvider>

</div>
  )
}

export default App
