const radios = document.getElementsByName('location'),
    addRecordInput = document.querySelectorAll("#newCartForm input"),
    itemInput = document.getElementById("item"),
    dateInput = document.getElementById("date"),
    timeInput = document.getElementById("time"),
    costInput = document.getElementById("cost"),
    newCartForm = document.getElementById("newCartForm"),
    addButton = document.getElementById("addButton"),
    sortBy = document.getElementById("sort_by"),
    recordTable = document.getElementById("record__table"),
    mainTableBody = document.getElementById('main__record__body'),
    summaryBody = document.getElementById("summary__body"),
    searchFormInput = document.querySelectorAll("#searchForm input"),
    searchButton = document.getElementById("searchButton"),
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

var views = {
    /**
     * @param  {object} data The data for main record table body td
     * @returns {string} this returns each html tr for main record table
     */
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
    /**
     * @param  {object} data The data for summary table body td
     * @returns {string} this returns each html tr for main record table
     */
    summaryTableView(data) {
        return `
        <tr>
            <td>${data.location}</td>
            <td>${data.no_of_record}</td>
            <td>${data.cost}</td>
        </tr>
        `;
    },
    /**
     * @param  {} data The data for search table body td
     * @returns {string} this returns each html tr for search table body
     */
    searchTableView(data) {
        return `
        <tr>
            <td>${data.location}</td>
            <td>${data.date}</td>
            <td>${data.time}</td>
            <td>${data.items}</td>
            <td>${data.cost}</td>
        </tr>
        `
    }
}
var controller = {
    /**
     * @description this checks input if valid or not and if valid add new valid record to shoppingRecord Arr
     * @description if record is invalid class is added to their parent element to style in css
     */
    addRecords() {
        let checkAllInput = true;
        for (let i = 0; i < addRecordInput.length; i++) {
            if (addRecordInput[i].value == '') {
                checkAllInput = false;
                addRecordInput[i].parentElement.classList.add("input__error");
            }
            else {
                addRecordInput[i].parentElement.classList.remove("input__error");
            }
        }
        let checkDate = controller.isValidDate(dateInput);
        let checkTime = controller.isValidTime(timeInput);
        if (checkAllInput && checkDate && checkTime) {
            let data = {};
            for (let i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    data.location = radios[i].value;
                    break;
                }
            }
            data.items = itemInput.value;
            data.date = dateInput.value;
            data.time = controller.formatTime(timeInput.value);
            data.cost = costInput.value;
            state.shoppingRecordArr.push(data);
            newCartForm.reset();
            controller.showRecords();
        }
    },
    /**
     * @description this loop over shoppingRecordArr and calls view for mainTableView and finally display content on body tag
     */
    showRecords() {
        let htmlContent = '';
        for (let i = 0; i < state.shoppingRecordArr.length; i++) {
            htmlContent += views.mainTableView(state.shoppingRecordArr[i])
        }
        mainTableBody.innerHTML = '';
        mainTableBody.innerHTML = htmlContent;
    },
    /**
     * @description this loop over shoppingRecordArr and calculate no_of_record according to location
     * @description arrange data in desending order
     * @description finally calls summaryTableView and display html content on body
     */
    tallyRecords() {
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
            for (let j = 0; j < (state.summaryData.length - i - 1); j++) {
                if (state.summaryData[j].no_of_record < state.summaryData[j + 1].no_of_record) {
                    let tmp = state.summaryData[j];
                    state.summaryData[j] = state.summaryData[j + 1];
                    state.summaryData[j + 1] = tmp;
                }
            }
        }

        for (let i = 0; i < state.summaryData.length; i++) {
            htmlContent += views.summaryTableView(state.summaryData[i])
        }

        summaryBody.innerHTML = '';
        summaryBody.innerHTML = htmlContent;
    },
    /**
     * @description this calculate no_of_record a/c to location and store in newArray
     * @description arrange  newArray a/c to location descending order
     * @description array newArray a/c to no_of_record
     * @description compares shoppingRecordArr location and newArray location and when equals push to newShoppingArr
     * @description finally replace ShoppingRecordArr with newShoppingArr and calls showRecords
     * 
     */
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
    /**
     * @description this sort shoppingRecordArr with date by bubble sorting and calls showRecords 
     * @description also bedore sorting  convert each date to make in readable format for new Date() by passing value to formatDate function
     */
    sortByDate() {
        let length = state.shoppingRecordArr.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                let first = controller.formatDate(state.shoppingRecordArr[j].date);
                let second = controller.formatDate(state.shoppingRecordArr[j + 1].date);
                if (first > second) {
                    controller.swap(j);
                }
            }
        }
        controller.showRecords();
    },
    /**
    * @description this sort shoppingRecordArr with time by bubble sorting and calls showRecords 
    */
    sortByTime() {
        let length = state.shoppingRecordArr.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                if (state.shoppingRecordArr[j].time > state.shoppingRecordArr[j + 1].time) {
                    controller.swap(j);
                }
            }
        }
        controller.showRecords();
    },
    /**
   * @description this sort shoppingRecordArr with cost by bubble sorting and calls showRecords 
   */
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
    /**
   * @description this sort shoppingRecordArr with items by bubble sorting and calls showRecords 
   */
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
    /**
   * @description this check all input validation in search form and if not valid add class a/c to error in their parent element
   * @description also validate startDate startTime and endDate endTime 
   * @description after validation results true check each element on shoppingRecordArr with entered input value and if true push to searchResultArray
   * @description if searchResultArray has element call searchTableView and displays in table
   */
    searchRecord() {
        let checkAllInput = true;
        for (let i = 0; i < searchFormInput.length - 1; i++) {
            if (addRecordInput[i].value == '') {
                checkAllInput = false;
                addRecordInput[i].parentElement.classList.add("input__error");
            }
            else {
                addRecordInput[i].parentElement.classList.remove("input__error");
            }
        }
        let checkDate = controller.isValidDate(startDate) && controller.isValidDate(endDate);
        let checkTime = controller.isValidTime(startTime) && controller.isValidTime(endTime);
        let checkStartEndDate = false;
        let checkStartEndTime = false;
        if (checkDate) {
            let first = controller.formatDate(startDate.value);
            let second = controller.formatDate(endDate.value);
            if (first <= second) {
                checkStartEndDate = true;
                startDate.parentElement.classList.remove("mismatch__error");
                endDate.parentElement.classList.remove("mismatch__error");
            }
            else {
                startDate.parentElement.classList.add("mismatch__error");
                endDate.parentElement.classList.add("mismatch__error");
            }
        }

        if (checkTime) {
            if (controller.formatTime(startTime.value) <= controller.formatTime(endTime.value)) {
                checkStartEndTime = true;
                startTime.parentElement.classList.remove("mismatch__error");
                endTime.parentElement.classList.remove("mismatch__error");
            }
            else {
                startTime.parentElement.classList.add("mismatch__error");
                endTime.parentElement.classList.add("mismatch__error");
            }
        }
        if (checkAllInput && checkStartEndDate && checkStartEndTime) {
            let searchResultArray = [];
            for (let i = 0; i < state.shoppingRecordArr.length; i++) {
                let dateCondition = controller.formatDate(state.shoppingRecordArr[i].date) >= controller.formatDate(startDate.value)
                    && controller.formatDate(state.shoppingRecordArr[i].date) <= controller.formatDate(endDate.value);
                let timeCondition = Number(state.shoppingRecordArr[i].time) >= controller.formatTime(startTime.value)
                    && Number(state.shoppingRecordArr[i].time) <= controller.formatTime(endTime.value);
                let searchInputCondition = itemSearchInput.value !== ''
                    ? state.shoppingRecordArr[i].items.toLowerCase().includes(itemSearchInput.value.toLowerCase())
                    : true;

                if (dateCondition && timeCondition && searchInputCondition) {
                    searchResultArray.push({ ...state.shoppingRecordArr[i] })
                }
            }
            if (searchResultArray.length > 0) {
                let htmlContent = '';
                for (let i = 0; i < searchResultArray.length; i++) {
                    htmlContent += views.searchTableView(searchResultArray[i]);
                }
                resultBody.innerHTML = '';
                resultBody.innerHTML = htmlContent;
            }
            else {
                resultBody.innerHTML = ''
                console.log("no matching record");
            }

        }

    },
    /**
     * @param  {element} inputText this is input date element consisting value of date
     * @returns {boolean} return true if date is validated and false if not validated. also add class to parent element if not valid
     */
    isValidDate(inputText) {
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
                    controller.alertInvalid(inputText);
                    return false;
                }
            }
            if (month == 2) {
                let leapYear = false;
                if ((!(year % 4) && year % 100) || !(year % 400)) {
                    leapYear = true;
                }
                if ((leapYear == false) && (day >= 29)) {
                    controller.alertInvalid(inputText);
                    return false;
                }
                if ((leapYear == true) && (day > 29)) {
                    controller.alertInvalid(inputText);
                    return false;
                }
            }
            return true;
        }
        else {
            controller.alertInvalid(inputText);
            return false;
        }
    },

    /**
     * @param  {string} data this takes input as date string 
     * @returns converts to date with new Date()
     */
    formatDate(data) {
        let format = data.split("/");
        return new Date(`${format[1]}/${format[0]}/${format[2]}`);
    },
    /**
    * @param  {element} data this is input time element consisting value of time
    * @returns {boolean} return true if time is validated and false if not validated. also add class to parent element if not valid
    */
    isValidTime(input) {
        var inputValue = input.value;

        if (inputValue.length < 5) {
            controller.alertInvalid(input);
            return false;
        }
        if (inputValue.length > 7) {
            controller.alertInvalid(input);
            return false;
        }

        if (inputValue.charAt(inputValue.length - 1) != "M" && inputValue.charAt(
            inputValue.length - 1) != "m") {
            controller.alertInvalid(input);
            return false;

        }
        else if (inputValue.charAt(inputValue.length - 2) != 'A' && inputValue.charAt(
            inputValue.length - 2) != 'a' && inputValue.charAt(
                inputValue.length - 2) != 'p' && inputValue.charAt(inputValue.length - 2) != 'P') {
            controller.alertInvalid(input);
            return false;
        }

        var seperatorPosition = inputValue.indexOf(':');

        if (seperatorPosition < 0) {
            controller.alertInvalid(input);
            return false;
        }
        else if (seperatorPosition > 2 || seperatorPosition < 1) {
            controller.alertInvalid(input);
            return false;
        }

        var hourValue = controller.shortenString(inputValue.substring(0, seperatorPosition));

        if (hourValue == -100) {
            controller.alertInvalid(input);
            return false;
        }


        if (hourValue > 23) {
            controller.alertInvalid(input);
            return false;
        }
        else if (hourValue < 0) {
            controller.alertInvalid(input);
            return false;
        }

        if (hourValue > 11 && inputValue.charAt(
            inputValue.length - 2) == 'a') {
            controller.alertInvalid(input);
            return false;
        }

        if (hourValue < 12 && inputValue.charAt(
            inputValue.length - 2) == 'p') {
            controller.alertInvalid(input);
            return false;
        }

        var minuteValue = controller.shortenString(inputValue.substring(seperatorPosition + 1, seperatorPosition + 3));

        if (minuteValue == -100) {
            controller.alertInvalid(input);
            return false;
        }

        if (minuteValue > 59) {
            controller.alertInvalid(input);
            return false;
        }
        else if (minuteValue < 0) {
            controller.alertInvalid(input);
            return false;
        }

        return true;
    },
    /**
     * @param  {string} data this takes input as time
     * @returns only return hour
     */
    formatTime(data) {
        return Number(data.split(":")[0]);
    },
    /**
     * @param  {string} str this checks if string or not
     * @returns return -100 if number and return sting if not number
     */
    shortenString(str) {
        var string = '';
        var i = 0;
        while (i != str.length) {
            if (str.charAt(i) != ' ') string = string + str.charAt(i); i++;
        }
        var retval = controller.checkIfNumber(string);
        if (retval == false)
            return -100;
        else
            return string;
    },
    /**
     * @description checks if value entered by user is numeric or not
     * @returns if not numbric returns false
     */
    checkIfNumber(strString) {
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
    },

    /**
     * @param  {integer} j this swap value for bubble sorting in shoppingRecordArr
     */
    swap(j) {
        let tmp = state.shoppingRecordArr[j];
        state.shoppingRecordArr[j] = state.shoppingRecordArr[j + 1];
        state.shoppingRecordArr[j + 1] = tmp;
    },
    /**
     * @param  {html element object} element receive element for adding class in parent element for invalid input element
     */
    alertInvalid(element) {
        if (element.value == '') {
            element.parentElement.classList.add("input__error");
            element.parentElement.classList.remove("validate__error");
        }
        else {
            element.parentElement.classList.remove("input__error");
            element.parentElement.classList.add("validate__error");
        }
    },

    /**
     * @description execute on start and calls showRecords for record showing and tallyRecords for summary table
     */
    onInit() {
        controller.showRecords();
        controller.tallyRecords();
    }
}

/**
 * @param  {event} 'click' catch whenever addButton on new rocord adding form clicks
 * @param  {function} addRecord calls this function after addButton is clicked
 */
addButton.addEventListener('click', addRecords);

/**
 * @param  {event} "change" executes when user changes sortBy value
 * @param  {function} sortRecords calls this function after value of sortBy is changed
 */
sortBy.addEventListener("change", sortRecords);

/**
 * @param  {} 'click' catch whenever searchButton on search form  is pressed
 * @param  {} searchRecord calls this function after searchButton is pressed
 */
searchButton.addEventListener('click', searchRecord);
/**
 * @param  {object} e event object of addButton button
 * @description prevent default behaviour after button click and finally calls addRecord funciton on controller object
 */
function addRecords(e) {
    e.preventDefault();
    controller.addRecords();
}

/**
 * @param  {object} e event object of searchButton button
 * @description prevent default behaviour after button click and finally calls searchRecord funciton on controller object
 */
function searchRecord(e) {
    e.preventDefault();
    controller.searchRecord();
}

/**
 * @param  {object} e event object of sortBy select element
 * @description checks value of select element form event object and calls sortBy function accordin to value
 */
function sortRecords(e) {
    let sortValue = sortBy.value;
    if (sortValue != '') {
        if (sortValue == 'location') {
            controller.sortByLocation();
        }
        else if (sortValue == 'date') {
            controller.sortByDate();
        }
        else if (sortValue == 'time') {
            controller.sortByTime();
        }
        else if (sortValue == 'items') {
            controller.sortByItems();
        }
        else if (sortValue == 'cost') {
            controller.sortByCost();
        }
    }
}

/**
 * @description execute when document is loaded
 */
controller.onInit();