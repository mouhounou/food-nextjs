"use client"

import { useFormStatus } from "react-dom"


export function MealsFormSubmit() {
   
   const { pending } = useFormStatus()
   
   return <button disabled ={pending}>
      {
         pending? 'submitting ...' : "Share meal"
      }
   </button>
}