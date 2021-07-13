import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useDate = (id) => {
   const [date,setDate] = useState([])

   useEffect(() => {
      const unsub = projectFirestore.collection('dates').doc(id)
      .onSnapshot(doc =>{
        if(doc.data()){
           setDate({...doc.data(), id: doc.id})
        }   
      })
      return (() => unsub())
   }, [id])

   return {date}
}
 
export default useDate;