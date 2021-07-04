import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useArchivedMembers = (collection) => {
   const [archivedMembers,setArchivedMembers] = useState([])

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
         setArchivedMembers(results)
      })

      return (() => unsub())
   }, [collection])

   return {archivedMembers}
}
 
export default useArchivedMembers;