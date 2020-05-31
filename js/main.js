const addButton = document.getElementById("addButton"),
    radios = document.getElementsByName('location'),
    itemInput = document.getElementById("item"),
    dateInput = document.getElementById("date"),
    timeInput = document.getElementById("time"),
    costInput = document.getElementById("cost"),
    newCartForm = document.getElementById("newCartForm"),
    recordTable = document.getElementById("record__table"),
    mainTableBody = document.getElementById('main__record__body'),
    summaryBody = document.getElementById("summary__body"),
    searchForm = document.getElementById("searchForm"),
    resultTable = document.getElementById("result__table"),
    resultBody = document.getElementById("result__body"),
    startDate = document.getElementById("start_date"),
    endDate = document.getElementById("end_date"),
    startTime = document.getElementById("start_time"),
    endTime = document.getElementById("end_time"),
    itemSearchInput = document.getElementById("itemSearch");

var shoppingRecordArr = [
    { location: 'Oversea', items: 'copy', date: '03/12/1998', time: '10', cost: "44" },
    { location: 'Toowoomba', items: 'car', date: '08/02/1875', time: '23', cost: "55" },
    { location: 'Australia', items: 'Pen, paper', date: '31/12/1773', time: '01', cost: "33" },
]


newCartForm.addEventListener('submit', addRecord);
searchForm.addEventListener('submit', searchRecord);

function addRecord(e) {
    e.preventDefault();
    let checkDate = validatedate(dateInput);
    let checkTime = validatetime(timeInput);
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
        data.time = formatTime(timeInput.value);
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

function validatetime(input) {
    var strval = input.value;

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

tallyRecord();

function sortByLocation() {
    let newObject = {};
    for (let i = 0; i < shoppingRecordArr.length; i++) {
        if (newObject[shoppingRecordArr[i].location]) {
            newObject[shoppingRecordArr[i].location].no_of_record += 1;
        }
        else {
            newObject[shoppingRecordArr[i].location] = {
                location: shoppingRecordArr[i].location,
                no_of_record: 1,
            }
        }
    }
    let newArray = Object.values(newObject);
    let length = newArray.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < (length - i - 1); j++) {
            if (newArray[j].no_of_record < newArray[j + 1].no_of_record) {
                let tmp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = tmp;
            }
        }
    }
    let newShoppingArray = [];
    for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < shoppingRecordArr.length; j++) {
            if (shoppingRecordArr[j].location == newArray[i].location) {
                newShoppingArray.push(shoppingRecordArr[j]);
            }
        }
    }
    console.log(newShoppingArray)

    showRecords();
}

function sortByDate() {
    let length = shoppingRecordArr.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < (length - i - 1); j++) {
            let first = formatDate(shoppingRecordArr[j].date);
            let second = formatDate(shoppingRecordArr[j + 1].date);
            if (first > second) {
                let tmp1 = shoppingRecordArr[j];
                shoppingRecordArr[j] = shoppingRecordArr[j + 1];
                shoppingRecordArr[j + 1] = tmp1;
            }
        }
    }
    showRecords();
}

function sortByCost() {
    let length = shoppingRecordArr.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < (length - i - 1); j++) {
            if (shoppingRecordArr[j].cost > shoppingRecordArr[j + 1].cost) {
                let tmp = shoppingRecordArr[j];
                shoppingRecordArr[j] = shoppingRecordArr[j + 1];
                shoppingRecordArr[j + 1] = tmp;
            }
        }
    }
    showRecords();
}

function sortByItems() {
    let length = shoppingRecordArr.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < (length - i - 1); j++) {
            if (shoppingRecordArr[j].items > shoppingRecordArr[j + 1].items) {
                let tmp = shoppingRecordArr[j];
                shoppingRecordArr[j] = shoppingRecordArr[j + 1];
                shoppingRecordArr[j + 1] = tmp;
            }
        }
    }
    showRecords();
}

function searchRecord(e) {
    e.preventDefault();
    let checkDate = validatedate(startDate) && validatedate(endDate);
    let checkTime = validatetime(startTime) && validatetime(endTime);
    let checkStartEndDate = false;
    let checkStartEndTime = false;
    if (checkDate) {
        let first = formatDate(startDate.value);
        let second = formatDate(endDate.value);
        if (first <= second) {
            checkStartEndDate = true
        }
        else {
            console.log("start date and end date error")
        }
    }
    if (checkTime) {
        if (formatTime(startTime.value) <= formatTime(endTime.value)) {
            checkStartEndTime = true
        }
        else {
            console.log("start time and end time error")
        }
    }

    if (checkStartEndDate && checkStartEndTime) {
        let searchResultArray = [];
        for (let i = 0; i < shoppingRecordArr.length; i++) {
            let dateCondition = formatDate(shoppingRecordArr[i].date) >= formatDate(startDate.value)
                && formatDate(shoppingRecordArr[i].date) <= formatDate(endDate.value);
            let timeCondition = formatTime(shoppingRecordArr[i].time) >= formatTime(startTime.value)
                && formatTime(shoppingRecordArr[i].time) <= formatTime(endTime.value);
            let searchInputCondition = itemSearchInput.value !== ''
                ? shoppingRecordArr[i].items.toLowerCase().includes(itemSearchInput.value.toLowerCase())
                : true;

            if (dateCondition && timeCondition && searchInputCondition) {
                searchResultArray.push({ ...shoppingRecordArr[i] })
            }
        }

        if (searchResultArray.length > 0) {
            let htmlContent = '';
            for (let i = 0; i < searchResultArray.length; i++) {
                htmlContent += `
                <tr>
                    <td>${searchResultArray[i].location}</td>
                    <td>${searchResultArray[i].date}</td>
                    <td>${searchResultArray[i].time}</td>
                    <td>${searchResultArray[i].items}</td>
                    <td>${searchResultArray[i].cost}</td>
                </tr>
                `
            }
            resultBody.innerHTML = '';
            resultBody.innerHTML = htmlContent;
        }
        else {
            resultBody.innerHTML = ''
            console.log("no matching record");
        }

    }

}

function formatDate(data) {
    let format = data.split("/");
    return new Date(`${format[1]}/${format[0]}/${format[2]}`);
}

function formatTime(data) {
    return Number(data.split(":")[0]);
}