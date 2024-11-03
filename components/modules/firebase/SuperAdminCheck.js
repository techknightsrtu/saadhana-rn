import { useEffect, useState } from "react"
import { fetchCurrUserId } from './fetchCurrUserId';

export const SuperAdminCheck =async () => {

        const data = await fetchCurrUserId();
        console.log(data.userId)
        return(data.userId === 'QI0vWII3CkGdS3v8GrKY')
}