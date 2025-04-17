export const DateCompare = (WeekDays, SaadhanaDates) => {
   
    const resultArray = WeekDays.map(date =>
      SaadhanaDates.includes(date) ? 'Filled' : 'Not Filled'
    );
    return resultArray;
  }
  