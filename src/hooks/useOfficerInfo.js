import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useOfficerInfo = (id) => {
   const [officer,setOfficer] = useState([])

   useEffect(() => {
      const unsub = projectFirestore.collection('officers').doc(id)
      .onSnapshot(doc =>{
        if(doc.data()){
           setOfficer({...doc.data(), id: doc.id})
        }   
      })
      return (() => unsub())
   }, [id])

   return {officer}
}
 
export default useOfficerInfo;