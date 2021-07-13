import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useOfficers = (collection) => {
   const [officers,setOfficers] = useState([])
   const [totalSubOfficers,setTotalSubOfficers] = useState(0)
   const [totalPaidUpOfficers,setTotalPaidUpOfficers] = useState(0)

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
               setTotalSubOfficers(total1 += parseInt(doc.data().subscribedShares))
               setTotalPaidUpOfficers(total2 += parseInt(doc.data().paidUpShares))
            }
         })
         setOfficers(results)
      })

      return (() => unsub())
   }, [collection])

   return {officers, totalSubOfficers, totalPaidUpOfficers}
}
 
export default useOfficers;