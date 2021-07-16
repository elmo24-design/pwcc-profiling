import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useArchivedDates = (collection) => {
   const [archivedDates,setArchivedDates] = useState([])

   useEffect(() => {
      const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt','desc')
      .onSnapshot(snap => {
         let results = []
         snap.docs.forEach(doc=> {
            if(doc.data().status === false){
               doc.data().createdAt && results.push({...doc.data(), id: doc.id})
            }
         })
         setArchivedDates(results)
      })

      return (() => unsub())
   }, [collection])

   return {archivedDates}
}
 
export default useArchivedDates;