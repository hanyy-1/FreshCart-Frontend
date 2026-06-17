 import React, { useState } from 'react'
 
 export default function useOnline() {
const[isonline , setIsonline]= useState(true)

   
    
         window.addEventListener('online',function(){
      setIsonline(true)
  })

    window.addEventListener('offline',function(){
    setIsonline(false)
  })

    
  
   return {online:isonline}
 }
 