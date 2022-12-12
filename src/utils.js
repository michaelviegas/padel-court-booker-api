function getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                      .indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return;
    refDate.setHours(0,0,0,0);
    refDate.setDate(refDate.getDate() + +!!excludeToday + (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
    return refDate;
}

function formatDate(d) {
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth()+1}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

export default {
    getNextDayOfTheWeek,
    formatDate
}