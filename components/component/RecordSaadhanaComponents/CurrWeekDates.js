export const CurrWeekDays=()=>{
    const today = new Date()
            const dayofweek = today.getDay()
            const difftomonday = dayofweek === 0 ? -6 : 1 - dayofweek
            const currentmonday = new Date(today)
            currentmonday.setDate(today.getDate() + difftomonday)

    const datesArray=[]
            for(let i=0;i<7;i++){
                const day=new Date(currentmonday)
                day.setDate(currentmonday.getDate()+i)
                const formattedDay = `${String(day.getDate()).padStart(2, '0')}-${String(day.getMonth() + 1).padStart(2, '0')}-${day.getFullYear()}`;
                datesArray.push(formattedDay)
            }
            return datesArray
}