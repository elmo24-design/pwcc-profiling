import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
//views
import Dashboard from "./views/Dashboard";
import Products from "./views/Products";
import ProductsRice from "./views/ProductsRice";
import SalesDetails from "./views/SalesDetails";
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
  const [snackBarMovedToOfficer,setSnackBarMovedToOfficer] = useState(false) //moved officer to member state in officer info
  const [snackBarMovedToMember,setSnackBarMovedToMember] = useState(false) //moved officer to member state in officer info

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
                     <Route exact path="/products">
                        <Products />
                     </Route>
                     <Route exact path="/products/rice">
                        <ProductsRice 
                          snackBarArchived={snackBarArchived} 
                          setSnackBarArchived={setSnackBarArchived}
                        />
                     </Route>
                     <Route path="/products/rice/:id">
                        <SalesDetails  setSnackBarArchived={setSnackBarArchived} />
                     </Route>
                     <Route path="/officers">
                        <Officers 
                           snackBarArchived={snackBarArchived} 
                           setSnackBarArchived={setSnackBarArchived}
                           snackBarMovedToOfficer={snackBarMovedToOfficer}
                           setSnackBarMovedToOfficer={setSnackBarMovedToOfficer}
                           />
                     </Route>
                     <Route path="/members">
                        <Members 
                           snackBarArchived={snackBarArchived} 
                           setSnackBarArchived={setSnackBarArchived} 
                           snackBarMovedToMember={snackBarMovedToMember}
                           setSnackBarMovedToMember={setSnackBarMovedToMember}
                        />
                     </Route>
                     <Route path="/archive">
                        <Archive />
                     </Route>
                     <Route path="/officer/:id">
                        <OfficerInfo 
                           setSnackBarArchived={setSnackBarArchived}
                           setSnackBarMovedToOfficer={setSnackBarMovedToOfficer}
                        />
                     </Route>
                     <Route path="/member/:id">
                        <MemberInfo 
                           setSnackBarArchived={setSnackBarArchived}
                           setSnackBarMovedToMember={setSnackBarMovedToMember}
                        />
                     </Route>
                  </Layout>
               </Switch>
            </AuthProvider>
       </ThemeProvider>
    </div>
  );
}

export default App;
