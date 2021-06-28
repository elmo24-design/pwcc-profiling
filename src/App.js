import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
//views
import Dashboard from "./views/Dashboard";
import Officers from "./views/Officers";
import Signin from "./views/Signin";
//components
import Layout from "./components/Layout";


import { createMuiTheme, ThemeProvider } from '@material-ui/core';


const theme = createMuiTheme({
   palette: {
      primary: {
        main: '#673ab7'
      },
      secondary: {
         main: '#FF00A8',
      }
   },
   // palette: {
   //    primary: {
   //      main: '#2C5AFF'
   //    },
   //    secondary: {
   //       main: '#00A3FF'
   //    }
   // },
})


function App() {

  return (
    <div className="App">
       <ThemeProvider theme={theme}>
            <AuthProvider>
               <Switch>
                  <Route exact path="/">
                     <Signin />
                  </Route>
                  <Layout>
                     <Route path="/dashboard">
                        <Dashboard />
                     </Route>
                     <Route path="/officers">
                        <Officers />
                     </Route>
                  </Layout>
               </Switch>
            </AuthProvider>
       </ThemeProvider>
    </div>
  );
}

export default App;
