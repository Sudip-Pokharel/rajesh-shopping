const addButton = document.getElementById("addButton"),
    radios = document.getElementsByName('location'),
    itemInput = document.getElementById("item"),
    dateInput = document.getElementById("date"),
    timeInput = document.getElementById("time"),
    costInput = document.getElementById("cost"),
    newCartForm = document.getElementById("newCartForm"),
    recordTable = document.getElementById("record__table"),
    mainTableBody = document.getElementById('main__record__body'),
    summaryBody = document.getElementById("summary__body");

var shoppingRecordArr = [
    { location: 'Australia', items: 'pen, paper', date: '30/12/2010', time: '01', cost: "33" },
    { location: 'Oversea', items: 'copy', date: '03/14/1998', time: '10', cost: "44" },
    { location: 'Toowoomba', items: 'car', date: '08/02/1875', time: '23', cost: "55" }
]


newCartForm.addEventListener('submit', addRecord);

function addRecord(e) {
    e.preventDefault();
    let checkDate = validatedate(dateInput);
    let checkTime = validatetime();
    if (checkDate && checkTime) {
        let data = {};
        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                data.location = radios[i].value;
                break;
            }
        }
        data.items = itemInput.value;
        data.date = dateInput.value;
        data.time = timeInput.value.split(":")[0];
        data.cost = costInput.value;
        shoppingRecordArr.push(data);
        // newCartForm.reset();
        showRecords();
    }
}
function validatedate(inputText) {
    var opera1 = inputText.value.split('/');
    if (opera1.length == 3) {
        var dd = parseInt(opera1[0]);
        var mm = parseInt(opera1[1]);
        var yy = parseInt(opera1[2]);
    }
    if (dd >= 1 && dd <= 31 && mm >= 1 && mm <= 12 && yy > 1583) {
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                alert('Invalid date format!');
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                alert('Invalid date format!');
                return false;
            }
            if ((lyear == true) && (dd > 29)) {
                alert('Invalid date format!');
                return false;
            }
        }
        return true;
    }
    else {
        alert("Invalid date format!");
        return false;
    }
}

function validatetime() {
    var strval = timeInput.value;
    var strval1;

    //minimum lenght is 6. example 1:2 AM
    if (strval.length < 5) {
        alert("Error.Invalid time");
        return false;
    }
    //Maximum length is 8. example 10:45 AM
    if (strval.length > 7) {
        alert("Error.Invalid time");
        return false;
    }

    //Checking AM/PM
    if (strval.charAt(strval.length - 1) != "M" && strval.charAt(
        strval.length - 1) != "m") {
        alert("Error.Invalid time");
        return false;

    }
    else if (strval.charAt(strval.length - 2) != 'A' && strval.charAt(
        strval.length - 2) != 'a' && strval.charAt(
            strval.length - 2) != 'p' && strval.charAt(strval.length - 2) != 'P') {
        alert("Error.Invalid time");
        return false;

    }

    var pos1 = strval.indexOf(':');
    // timeInput.value = strval;

    if (pos1 < 0) {
        alert("Error.Invalid time");
        return false;
    }
    else if (pos1 > 2 || pos1 < 1) {
        alert("Error.Invalid time");
        return false;
    }

    //Checking hours
    var horval = trimString(strval.substring(0, pos1));

    if (horval == -100) {
        alert("Error.Invalid time");
        return false;
    }


    if (horval > 23) {
        alert("Error.Invalid time");
        return false;
    }
    else if (horval < 0) {
        alert("Error.Invalid time");
        return false;
    }

    if (horval > 11 && strval.charAt(
        strval.length - 2) == 'a') {
        alert("Error.Invalid time");
        return false;
    }

    if (horval < 12 && strval.charAt(
        strval.length - 2) == 'p') {
        alert("Error.Invalid time");
        return false;
    }
    //Completes checking hours.

    //Checking minutes.
    var minval = trimString(strval.substring(pos1 + 1, pos1 + 3));

    if (minval == -100) {
        alert("Error.Invalid time");
        return false;
    }

    if (minval > 59) {
        alert("Error.Invalid time");
        return false;
    }
    else if (minval < 0) {
        alert("Error.Invalid time");
        return false;
    }

    return true;
}

function trimString(str) {
    var str1 = '';
    var i = 0;
    while (i != str.length) {
        if (str.charAt(i) != ' ') str1 = str1 + str.charAt(i); i++;
    }
    var retval = IsNumeric(str1);
    if (retval == false)
        return -100;
    else
        return str1;
}

function IsNumeric(strString) {
    var strValidChars = "0123456789";
    var strChar;
    var blnResult = true;
    if (strString.length == 0)
        return false;
    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
            blnResult = false;
        }
    }
    return blnResult;
}

function showRecords() {
    let htmlContent = '';
    for (let i = 0; i < shoppingRecordArr.length; i++) {
        htmlContent += `
        <tr>
            <td>${shoppingRecordArr[i].location}</td>
            <td>${shoppingRecordArr[i].date}</td>
            <td>${shoppingRecordArr[i].time}</td>
            <td>${shoppingRecordArr[i].items}</td>
            <td>${shoppingRecordArr[i].cost}</td>
        </tr>
        `;
    }
    mainTableBody.innerHTML = '';
    mainTableBody.innerHTML = htmlContent;
}

function tallyRecord() {
    let summary = {};
    let htmlContent = '';
    for (let i = 0; i < shoppingRecordArr.length; i++) {
        if (summary[shoppingRecordArr[i].location]) {
            summary[shoppingRecordArr[i].location].no_of_record += 1;
            summary[shoppingRecordArr[i].location].cost += Number(shoppingRecordArr[i].cost)
        }
        else {
            summary[shoppingRecordArr[i].location] = {
                location: shoppingRecordArr[i].location,
                no_of_record: 1,
                cost: Number(shoppingRecordArr[i].cost)
            }
        }
    }

    let summaryData = Object.values(summary);

    for (let i = 0; i < summaryData.length; i++) {
        htmlContent += `
        <tr>
            <td>${summaryData[i].location}</td>
            <td>${summaryData[i].no_of_record}</td>
            <td>${summaryData[i].cost}</td>
        </tr>
        `;
    }

    summaryBody.innerHTML = '';
    summaryBody.innerHTML = htmlContent;
}

showRecords();

tallyRecord()