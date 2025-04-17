export const setStudentDatainUI = ({ studentdata, setwaketime, setsleeptime, setdinner, setselectedoptiondaysleep, setselectedoptionmorning, setjapa, setselectedoptionbookreading, setselectedoptionlecturehearing, setcomment }) => {

    setwaketime(studentdata.wake_up_time)
    setsleeptime(studentdata.sleep_time)
    setdinner(studentdata.dinner_time)
    setselectedoptiondaysleep(studentdata.day_sleep_time)
    setselectedoptionmorning(studentdata.morning_program)
    setjapa(studentdata.japa_rounds)
    setselectedoptionbookreading(studentdata.book_reading)
    setselectedoptionlecturehearing(studentdata.lecture_hearing)
    setcomment(studentdata.comments)

}

