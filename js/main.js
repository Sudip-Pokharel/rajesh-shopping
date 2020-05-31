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

var state = {
    shoppingRecordArr: [
        { location: 'Oversea', items: 'copy', date: '03/12/1998', time: '10', cost: "44" },
        { location: 'Toowoomba', items: 'car', date: '08/02/1875', time: '23', cost: "55" },
        { location: 'Toowoomba', items: 'car', date: '08/02/1875', time: '23', cost: "55" },
        { location: 'Toowoomba', items: 'car', date: '08/02/1875', time: '23', cost: "55" },
        { location: 'Australia', items: 'Pen, paper', date: '31/12/1773', time: '01', cost: "33" },
    ],
    summaryData: []
}


newCartForm.addEventListener('submit', addRecord);
searchForm.addEventListener('submit', searchRecord);

function addRecord(e) {
    e.preventDefault();
    controller.addRecord()
}

function validatedate(inputText) {
    let format = inputText.value.split('/');
    let day, month, year;

    if (format.length == 3) {
        day = parseInt(format[0]);
        month = parseInt(format[1]);
        year = parseInt(format[2]);
    }
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year > 1583) {
        let numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month == 1 || month > 2) {
            if (day > numberOfDays[month - 1]) {
                alert('Invalid date format!');
                return false;
            }
        }
        if (month == 2) {
            let leapYear = false;
            if ((!(year % 4) && year % 100) || !(year % 400)) {
                leapYear = true;
            }
            if ((leapYear == false) && (day >= 29)) {
                alert('Invalid date format!');
                return false;
            }
            if ((leapYear == true) && (day > 29)) {
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
        for (let i = 0; i < state.shoppingRecordArr.length; i++) {
            let dateCondition = formatDate(state.shoppingRecordArr[i].date) >= formatDate(startDate.value)
                && formatDate(state.shoppingRecordArr[i].date) <= formatDate(endDate.value);
            let timeCondition = Number(state.shoppingRecordArr[i].time) >= formatTime(startTime.value)
                && Number(state.shoppingRecordArr[i].time) <= formatTime(endTime.value);
            let searchInputCondition = itemSearchInput.value !== ''
                ? state.shoppingRecordArr[i].items.toLowerCase().includes(itemSearchInput.value.toLowerCase())
                : true;

            if (dateCondition && timeCondition && searchInputCondition) {
                searchResultArray.push({ ...state.shoppingRecordArr[i] })
            }
        }
        console.log(searchResultArray)
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

var views = {
    mainTableView(data) {
        return `
        <tr>
            <td>${data.location}</td>
            <td>${data.date}</td>
            <td>${data.time}</td>
            <td>${data.items}</td>
            <td>${data.cost}</td>
        </tr>
        `;
    },
    summaryTableView(data) {
        return `
        <tr>
            <td>${data.location}</td>
            <td>${data.no_of_record}</td>
            <td>${data.cost}</td>
        </tr>
        `;
    }
}

var controller = {
    addRecord() {
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
            state.shoppingRecordArr.push(data);
            // newCartForm.reset();
            controller.showRecords();
        }
    },
    showRecords() {
        let htmlContent = '';
        for (let i = 0; i < state.shoppingRecordArr.length; i++) {
            htmlContent += views.mainTableView(state.shoppingRecordArr[i])
        }
        mainTableBody.innerHTML = '';
        mainTableBody.innerHTML = htmlContent;
    },
    tallyRecord() {
        let summary = {};
        let htmlContent = '';
        for (let i = 0; i < state.shoppingRecordArr.length; i++) {
            if (summary[state.shoppingRecordArr[i].location]) {
                summary[state.shoppingRecordArr[i].location].no_of_record += 1;
                summary[state.shoppingRecordArr[i].location].cost += Number(state.shoppingRecordArr[i].cost)
            }
            else {
                summary[state.shoppingRecordArr[i].location] = {
                    location: state.shoppingRecordArr[i].location,
                    no_of_record: 1,
                    cost: Number(state.shoppingRecordArr[i].cost)
                }
            }
        }

        state.summaryData = Object.values(summary);

        for (let i = 0; i < state.summaryData.length; i++) {
            htmlContent += views.summaryTableView(state.summaryData[i])
        }

        summaryBody.innerHTML = '';
        summaryBody.innerHTML = htmlContent;
    },
    sortByLocation() {
        let newObject = {};
        for (let i = 0; i < state.shoppingRecordArr.length; i++) {
            if (newObject[state.shoppingRecordArr[i].location]) {
                newObject[state.shoppingRecordArr[i].location].no_of_record += 1;
            }
            else {
                newObject[state.shoppingRecordArr[i].location] = {
                    location: state.shoppingRecordArr[i].location,
                    no_of_record: 1,
                }
            }
        }
        let newArray = Object.values(newObject);
        let length = newArray.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                if (newArray[j].location > newArray[j + 1].location) {
                    let tmp = newArray[j];
                    newArray[j] = newArray[j + 1];
                    newArray[j + 1] = tmp;
                }
            }
        }
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
            for (let j = 0; j < state.shoppingRecordArr.length; j++) {
                if (state.shoppingRecordArr[j].location == newArray[i].location) {
                    newShoppingArray.push(state.shoppingRecordArr[j]);
                }
            }
        }
        state.shoppingRecordArr = [...newShoppingArray];
        controller.showRecords();
    },
    sortByDate() {
        let length = state.shoppingRecordArr.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                let first = formatDate(state.shoppingRecordArr[j].date);
                let second = formatDate(state.shoppingRecordArr[j + 1].date);
                if (first > second) {
                    controller.swap(j);
                }
            }
        }
        controller.showRecords();
    },
    sortByCost() {
        let length = state.shoppingRecordArr.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                if (state.shoppingRecordArr[j].cost > state.shoppingRecordArr[j + 1].cost) {
                    controller.swap(j);
                }
            }
        }
        controller.showRecords();
    },
    sortByItems() {
        let length = state.shoppingRecordArr.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                if (state.shoppingRecordArr[j].items > state.shoppingRecordArr[j + 1].items) {
                    controller.swap(j);
                }
            }
        }
        controller.showRecords();
    },
    swap(j) {
        let tmp = state.shoppingRecordArr[j];
        state.shoppingRecordArr[j] = state.shoppingRecordArr[j + 1];
        state.shoppingRecordArr[j + 1] = tmp;
    },
    onInit() {
        controller.showRecords();
        controller.tallyRecord();
    }
}

controller.onInit();