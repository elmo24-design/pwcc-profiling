import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useMembers = (collection) => {
   const [members,setMembers] = useState([])
   const [totalSubMembers,setTotalSubMembers] = useState(0)
   const [totalPaidUpMembers,setTotalPaidUpMembers] = useState(0)

   useEffect(() => {
      const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt','desc')
      .onSnapshot(snap => {
         let results = []
         let total1 = 0
         let total2 = 0
         snap.docs.forEach(doc=> {
            if(doc.data().status === true){
               doc.data().createdAt && results.push({...doc.data(), id: doc.id})
               setTotalSubMembers(total1 += parseInt(doc.data().subscribedShares))
               setTotalPaidUpMembers(total2 += parseInt(doc.data().paidUpShares))
            }
         })
         setMembers(results)
      })
      
      return (() => unsub())
   }, [collection])

   return {members,totalSubMembers,totalPaidUpMembers}
}
 
export default useMembers;