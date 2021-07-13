import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useDates = (collection) => {
   const [dates,setDates] = useState([])

   useEffect(() => {
      const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt','desc')
      .onSnapshot(snap => {
         let results = []
         snap.docs.forEach(doc=> {
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
         })
         setDates(results)
      })

      return (() => unsub())
   }, [collection])

   return {dates}
}
 
export default useDates;