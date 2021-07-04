import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
//views
import Dashboard from "./views/Dashboard";
import Officers from "./views/Officers";
import Members from "./views/Members";
import Archive from "./views/Archive";
import OfficerInfo from './views/OfficerInfo';
import MemberInfo from "./views/MemberInfo";
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
  
  const [snackBarLogin, setSnackBarLogin] = useState(false) //snackbar for login
  const [snackBarArchived,setSnackBarArchived] = useState(false) //archived state in officer info

  return (
    <div className="App">
       <ThemeProvider theme={theme}>
            <AuthProvider>
               <Switch>
                  <Route exact path="/">
                     <Signin setSnackBarLogin={setSnackBarLogin} />
                  </Route>
                  <Layout>
                     <Route path="/dashboard">
                        <Dashboard snackBarLogin={snackBarLogin} setSnackBarLogin={setSnackBarLogin}/>
                     </Route>
                     <Route path="/officers">
                        <Officers snackBarArchived={snackBarArchived} setSnackBarArchived={setSnackBarArchived}/>
                     </Route>
                     <Route path="/members">
                        <Members snackBarArchived={snackBarArchived} setSnackBarArchived={setSnackBarArchived} />
                     </Route>
                     <Route path="/archive">
                        <Archive />
                     </Route>
                     <Route path="/officer/:id">
                        <OfficerInfo setSnackBarArchived={setSnackBarArchived}/>
                     </Route>
                     <Route path="/member/:id">
                        <MemberInfo setSnackBarArchived={setSnackBarArchived}/>
                     </Route>
                  </Layout>
               </Switch>
            </AuthProvider>
       </ThemeProvider>
    </div>
  );
}

export default App;
