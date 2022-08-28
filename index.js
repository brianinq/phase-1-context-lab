/* Your Code Here */
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map((array) => {
    return createEmployeeRecord(array);
  });
}
function createTimeInEvent(timeStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: Number(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0],
  });
  return this;
}
function createTimeOutEvent(timeStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: Number(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0],
  });
  return this;
}
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.filter((obj) => {
    return obj.date === date;
  })[0].hour;
  const timeOut = this.timeOutEvents.filter((obj) => {
    return obj.date === date;
  })[0].hour;
  return (timeOut - timeIn) / 100;
}
function wagesEarnedOnDate(date) {
  return this.payPerHour * hoursWorkedOnDate.call(this, date);
}
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.filter((employee) => {
    return employee.firstName === firstName;
  })[0];
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
function calculatePayroll(array) {
  return array.map((employee) => allWagesFor.call(employee)).reduce((payroll, employeeWage) => payroll + employeeWage);
}
