
import { err } from "inngest/types";
import { useState } from "react"
import { toast } from "sonner";

export const useFetch=(cb)=>{
    const [data,setData]=useState(undefined)
    const [loading,setLoading]=useState(null)
    const [error,setError]=useState(null);

    const fn=async(...args)=>{
        setLoading(true)
        setError(null)
        try {
            const response=await cb(...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error);
            toast.error(error.message);
         }
        finally{
            setLoading(false);
        }
    }
    return {data,loading,error,setData,fn} //

    //! IF FUNCTION PASSED INSIDE USEFETCH HOOK,
    //! FN IS THE IMPLEMENTATION PART IN THAT FUNCTION LIKE SAVING DATABASE
    //! THEN DATA IS THAT FUNCTION'S RETURNING STMT
    //! LOADING,ERROR WILL BE POWERED BY USEFETCH HOO


}
