function formatedDate(d) {
    const year = String(d.getFullYear()), time = String(d.toLocaleTimeString())
    let month = String(d.getMonth() + 1), day = String(d.getDate());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${year}-${month}-${day}  ${time}`;
}

module.exports = { formatedDate }