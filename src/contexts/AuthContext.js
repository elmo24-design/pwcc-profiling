import React, { useContext, useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { projectAuth } from '../firebase/config';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
   const [loading, setLoading] = useState(true)
   const [user, setUser] = useState(null)
   const history = useHistory()

   useEffect(() => {
      projectAuth.onAuthStateChanged(_user => {
         setUser(_user)
         setLoading(false)
         if(user){
            history.push('/dashboard')
         }else{
            history.push('/')
         }
      })
   }, [user, history])

   const value = { 
      user
   }

   return (
      <AuthContext.Provider value={value}>
         {!loading && children}
      </AuthContext.Provider>
   )
}


