import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useOfficers = (collection) => {
   const [officers,setOfficers] = useState([])

   useEffect(() => {
      const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt','desc')
      .onSnapshot(snap => {
         let results = []
         snap.docs.forEach(doc=> {
            if(doc.data().status === true){
               doc.data().createdAt && results.push({...doc.data(), id: doc.id})
            }
         })
         setOfficers(results)
      })

      return (() => unsub())
   }, [collection])

   return {officers}
}
 
export default useOfficers;