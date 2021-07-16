import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useRiceItems = (collection,id) => {
   const [riceItems,setRiceItems] = useState([])

   const [v1Total, setV1Total] = useState(0)
   const [v2Total, setV2Total] = useState(0)
   const [v3Total, setV3Total] = useState(0)
   const [v4Total, setV4Total] = useState(0)
   const [v5Total, setV5Total] = useState(0)
   const [v6Total, setV6Total] = useState(0)
   const [v7Total, setV7Total] = useState(0)
   const [v8Total, setV8Total] = useState(0)
   const [v9Total, setV9Total] = useState(0)
   const [v10Total, setV10Total] = useState(0)
   const [v11Total, setV11Total] = useState(0)
   const [v12Total, setV12Total] = useState(0)

   useEffect(() => {
      const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt','desc')
      .onSnapshot(snap => {
         let results = []

         let total1 = 0
         let total2 = 0
         let total3 = 0
         let total4 = 0
         let total5 = 0
         let total6 = 0
         let total7 = 0
         let total8 = 0
         let total9 = 0
         let total10 = 0
         let total11 = 0
         let total12 = 0

         snap.docs.forEach(doc=> {
            if(doc.data().ownerId === id){
               doc.data().createdAt && results.push({...doc.data(), id: doc.id})
               if(doc.data().variety === "Unli Rice"){
                  setV1Total(total1 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Chezka"){
                  setV2Total(total2 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Butter Cup"){
                  setV3Total(total3 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Gandang Dinurado"){
                  setV4Total(total4 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "24 Hours"){
                  setV5Total(total5 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Gandang Buhay"){
                  setV6Total(total6 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Star Gazer"){
                  setV7Total(total7 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Sinandomeng"){
                  setV8Total(total8 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Gold Cup"){
                  setV9Total(total9 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Malagkit"){
                  setV10Total(total10 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Thailand"){
                  setV11Total(total11 += parseInt(doc.data().total))
               }
               if(doc.data().variety === "Smart Choice"){
                  setV12Total(total12 += parseInt(doc.data().total))
               }
            }
         })
         setRiceItems(results)
      })

      return (() => unsub())
   }, [collection,id])

   return {
      riceItems, 
      v1Total,
      v2Total,
      v3Total,
      v4Total,
      v5Total,
      v6Total,
      v7Total,
      v8Total,
      v9Total,
      v10Total,
      v11Total,
      v12Total
   }
}
 
export default useRiceItems;