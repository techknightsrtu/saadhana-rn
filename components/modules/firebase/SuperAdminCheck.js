import { useEffect, useState } from "react"
import { fetchCurrUserId } from './fetchCurrUserId';

export const SuperAdminCheck =async () => {

        const currentId = await fetchCurrUserId();
        console.log(currentId)
        return(currentId === 'QI0vWII3CkGdS3v8GrKY')
}