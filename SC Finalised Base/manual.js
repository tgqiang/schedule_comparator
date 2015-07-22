/* 
 * MANUAL.JS FOR MANUAL.PHP //
 * CONTAINS THE SCRIPTING FOR MANUAL.PHP.
 */

/* SENSITIVE SQL KEYWORDS DEFINED HERE
(TO AVOID DUPLICATE DEFINITIONS IN VALIDATION FUNCTIONS) */
var keywords =   ["select",
                  "update",
                  "delete",
                  "insert",
                  "create",
                  "alter",
                  "drop",
                  "into",
                  "table",
                  "database",
                  "index",
                  "or ",
                  "and "];

/* VARIABLE FOR MANAGING AJAX REQUESTS */
var xmlhttp = new XMLHttpRequest();

/* SCHEDULE-INPUT-FIELD STACK ENVIRONMENT VARIABLE */
var scheduleInputState = {
  state: [],
  reset_prev: function() {
    if (this.state.length === 0) {
      window.alert("Input field cannot be resetted any more.");
    }
    else {
      this.state.pop();
      if (this.state.length === 0) {
        $("#schedule").val('');
      }
      else {
        $("#schedule").val(this.state[this.state.length - 1]);
      }
    }
  }
};

/* READY FUNCTIONS */
$(document).ready(function() {
  /* ================= PAGE READY HANDLER ================= */
	// ACCORDION EFFECT FOR NAVIGATIONS
  $(".accordion").accordion({
    collapsible: true,
    active: false
  });

	$(".titles").hover(
		function(){
			$(this).addClass('highlight');
		},
		function(){
			$(this).removeClass('highlight');
		}
	);

  // TEST IF ENTRY-ADDED HANDLER
  if (window.sessionStorage.getItem("added") === "true") {
    $("#create-user").hide();
    $("#edit-self").show();
  }
  else {
    $("#edit-self").hide();
  }
  /* ================= !PAGE READY HANDLER ================= */

  
  /* =============== 'X' BUTTON EXIT HANDLER =============== */
  // IF USER CLICKS 'X' BUTTON OF THE BROWSER (EXCEPTION HANDLING OF IMPROPER EXIT)
  window.addEventListener("beforeunload", function(event) {
    event.returnValue = "It is STRONGLY recommended that you leave this page by exiting the session via the button present in this page instead."; 
  });

  // IF USER CONFIRMS LEAVING PAGE VIA 'X' BUTTON OF THE BROWSER
  window.onunload = function() {
    window.sessionStorage.setItem("added", "false");
    $.ajax({
      async: false,
      type: 'GET',
      url: 'windowClose.php'
    });
  };
  /* =============== !'X' BUTTON EXIT HANDLER =============== */


	/* ========== MANUAL.HTML USER FORM SCRIPTING ========== */
  var dialog, form,
 
  name = $("#name"),
  date = $('#date').datepicker({
	 dateFormat: "yy-mm-dd",
	 minDate: 0,
  }),
  time_start = $('#time_start').timepicker({
    defaultTime: '',
    timeSeparator: '.',
    showLeadingZero: true,
    onSelect: tpStartSelect,
    maxTime: {
      hour: 23, minute: 00
    }
  }),
  time_end = $('#time_end').timepicker({
    defaultTime: '',
    timeSeparator: '.',
    showLeadingZero: true,
    onSelect: tpEndSelect,
    minTime: {
      hour: 08, minute: 00
    }
  }),
  schedule = $('#schedule');

  /* FOR TIMEPICKER */
  // when start time change, update minimum for end timepicker
  function tpStartSelect( time, endTimePickerInst ) {
     $('#time_end').timepicker('option', {
         minTime: {
             hour: endTimePickerInst.hours,
             minute: endTimePickerInst.minutes
         }
     });
  }

  /* FOR TIMEPICKER */
  // when end time change, update maximum for start timepicker
  function tpEndSelect( time, startTimePickerInst ) {
     $('#time_start').timepicker('option', {
         maxTime: {
             hour: startTimePickerInst.hours,
             minute: startTimePickerInst.minutes
         }
     });
  }


  /* FORM CONFIGURATIONS */
  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 400,
    width: 400,
    modal: true,
    buttons: {
      "Add/modify your entry": submitUser,
      Cancel: function() {
        dialog.dialog("close");
      }
    },
    close: function() {
      dialog.dialog("close");
    }
  });
  
  /* FORM SUBMIT EVENT */
  form = dialog.find("form").on("submit", function(event) {
    event.preventDefault();
  });
  
  /* BUTTON-CLICK HANDLER FOR USER TO APPEND DATE-TIME TO SCHEDULE INPUT FIELD */
  $("#append").click(function () {
    if (isDateTimeFilled(date, time_start, time_end)) {
      var value = schedule.val() + ($('#date').val() + " " + $('#time_start').val() + " to " + $('#time_end').val() + ",");
      scheduleInputState.state.push(value);
      schedule.val(value);
    }
  });

  /* BUTTON-CLICK HANDLER FOR USER TO UNDO CHANGES TO SCHEDULE INPUT FIELD */
  $("#revert").click(function() {
    scheduleInputState.reset_prev();
  });

  /* BUTTON-CLICK HANDLER WHEN USER INTENDS TO ADD/MODIFY HIS/HER OWN ENTRY */
  $("#create-user, #edit-self").button().on("click", function() {
    dialog.dialog("open");
  });

  /* BUTTON-CLICK HANDLER TO REFRESH TABLE THAT IS DISPLAYED */
  $("#reset-table").button().on("click", function() {
    $("tr#entry, td#entry").remove();
    $("#users tbody").load('refreshTable.php', function(result) {
      alert("Table is now updated.");
    });
  });
  
  /* BUTTON-CLICK HANDLER FOR COMMON DATE COMPUTATION */
  $("#compute").button().on("click", function() {
    $(document).load('computeDates.php', function(result) {
      var count = JSON.parse(result).length;      
      var parsedResult = _.reduce(JSON.parse(result),
                                  function(a, b) {
                                    return a.concat(b);
                                  });
      parsedResult.sort(DateTimeSort);
      var combinedSchedule = _.groupBy(parsedResult,
                                       function(obj) {
                                         return obj.date;
                                       }, 'date');
      compute_Dates(combinedSchedule, count);
    });
  });

  /* NAME VALIDATION FUNCTION:
  -> ATTEMPTS TO DETECT SENSITIVE SQL KEYWORDS IN NAME FIELD TO PREVENT SQL INJECTIONS
  -> NAME CANNOT CONTAIN ANYTHING OTHER THAN ALPHABETS, FULL/REAL NAME NOT REQUIRED
  -> NAME FIELD MUST ALSO NOT BE EMPTY
  */
  function name_Fill_Validate(inputName) {
    return validate(inputName.val());
  }

  /* DATE-TIME-FIELD VALIDATION FUNCTION:
  -> USERS ARE UNABLE TO EDIT INPUT THESE INPUTS VIA TYPING IN THE INPUT FIELD
  -> EMPTY INPUT IS STRICTLY NOT ACCEPTED
  */
  function isDateTimeFilled(inputDate, inputStartTime, inputEndTime) {
    if (inputDate.val().length === 0 ||
        inputStartTime.val().length === 0 ||
        inputEndTime.val().length === 0) {
      window.alert("Please ensure that the date, start time and end time that you are available are filled before appending your entry.");
      return false;
    } else {
      return true;
    }
  }

  /* SCHEDULE-FIELD VALIDATION FUNCTION:
  -> USERS ARE UNABLE TO EDIT INPUT THESE INPUTS VIA TYPING IN THE INPUT FIELD
  -> NEED TO DISPLAY WHOLE SCHEDULE TO USER TO DOUBLE-CHECK BEFORE SUBMISSION?
  */
  function isScheduleFilled(inputSchedule) {
    if (inputSchedule.val().length === 0) {
      window.alert("Please ensure that you have an available schedule before submitting this form.");
      return false;
    } else {
      return true;
    }
  }

  /* PREDEFINED FUNCTIONS FOR NON-GLOBAL USE */
 
  /* FUNCTION TO SUBMIT USER DATA TO PHP FILE */
  function addUser() {
   /* THIS IS TO ENSURE THE SCHEDULE AND THE NAME IS VALIDATED */
   var valid = name_Fill_Validate(name) &&
                isScheduleFilled(schedule);
    if (valid) {
        var json_str = JSON.stringify(dt_convert(schedule.val()).sort(DateTimeSort));
        $.get('addEntry.php',
              {
                person: name.val(),
                schedule: json_str,
                added: true
              },
              function(data) {
                window.alert(data);
                var nameUsed = "Name has been used by someone else in this session. Please enter in another name.";
                if (data !== nameUsed) {
                  name.attr("readonly", "true");
                  window.sessionStorage.setItem("added", "true");
                  $("#create-user").hide();
                  $("#edit-self").show();
                  dialog.dialog("close");
                }
                else {
                  event.preventDefault();
                }
              });
    }
    else {
      event.preventDefault();
    }
  }

  /* FUNCTION TO UPDATE USER'S OWN ENTRY VIA PHP FILE */
  function updateUser() {
   /* THIS IS TO ENSURE THE DATE AND THE NAME IS VALIDATED */
   var valid = name_Fill_Validate(name) &&
                isScheduleFilled(schedule); // --- CHANGED --- // --> TO CHANGE PHP FILE TOO
    
    if (valid) {
        var json_str = JSON.stringify(dt_convert(schedule.val()).sort(DateTimeSort));
        $.get('addEntry.php',
              {
                person: name.val(),
                schedule: json_str // --- CHANGED --- // --> TO CHANGE PHP FILE TOO
              },
              function(data) {
                window.alert(data);
              });
        dialog.dialog("close");
    }
    else {
      event.preventDefault();
    }
  }
  
  /* FUNCTION TO SUBMIT USER ENTRIES (EITHER VIA ADD OR UPDATE) */
  function submitUser() {
    if (window.sessionStorage.getItem("added") === "true") {
      event.preventDefault();
      updateUser();
    }
    else {
      event.preventDefault();
      addUser();
    }
  }
  /* ========== !MANUAL.HTML USER FORM SCRIPTING ========== */
})

/* ========== PREDEFINED FUNCTIONS FOR MANUAL.HTML USER FORM USAGE ========== */
/* COMPUTATION FUNCTION */
function compute_Dates(schedule_object, totalUsers) {
  var common = [];
  var keys = _.keys(schedule_object);

  for (var i = 0; i < keys.length; i = i + 1) {
    if (schedule_object[keys[i]].length === totalUsers) {
      common.push(schedule_object[keys[i]]);
    }
  }

  if (common.length === 0) {
    console.log("There is no common date where all of you are available. Please try to reach a compromise then try again.");
  }
  else {
    var res = compute_Times(common);
    res = "There are dates that all of you can meet up:/n" + res;
    window.alert(res);
   }
}

// FUNCTION TO TRIGGER WHEN COMMON DATE IS FOUND
function compute_Times(obj_arr) {
  var result = [];

  for (var i = 0; i < obj_arr.length; i++) {
    var ref_range = makeRange(obj_arr[i][0]);

    for (var j = 0; j < obj_arr[i].length; j++) {
      var current_range = makeRange(obj_arr[i][j]);
      ref_range = findIntersect(ref_range, current_range);
    }

    if (ref_range.length !== 0) {
      result.push([obj_arr[i][0].date, convertResult(ref_range)]);
    }
  }
  
  var string_result = '';
  for (var j = 0; j < result.length; j++) {
    string_result += (result[j][0] + ": " + result[j][1] + "\n");
  }
  return string_result;
}

// CONVERT TIME RANGE INTO USER-READABLE FORMAT
function convertResult(res_arr) {
  var res_str = '';
  for (var i = 0; i < res_arr.length; i++) {
    res_str += (res_arr[i].start._d.toString().substr(16,5) + " to "
                + res_arr[i].end._d.toString().substr(16,5) + ", ");
  }
  return res_str.substr(0, res_str.length - 2);
}


// TO CONVERT ARRAY OF TIMES INTO TIME RANGES
function makeRange(dt_obj) {
    var result = [];
    var date_args = dt_obj.date.split('-');
    
    for (var i = 0; i < dt_obj.times.length; i++) {
      var time_start_hr = parseInt(dt_obj.times[i].substr(0, 2));
      var time_start_min = parseInt(dt_obj.times[i].substr(3, 2));
      var time_end_hr = parseInt(dt_obj.times[i].substr(6, 2));
      var time_end_min = parseInt(dt_obj.times[i].substr(9, 2));
      var range = moment.range(new Date(date_args[0],
                                        date_args[1] - 1,
                                        date_args[2],
                                        time_start_hr,
                                        time_start_min),
                               new Date(date_args[0],
                                        date_args[1] - 1,
                                        date_args[2],
                                        time_end_hr,
                                        time_end_min));
      result.push(range);
    }
    
    return result;
}

// FUNCTION TO FIND INTERSECTING TIME RANGE
function findIntersect(range_arr1, range_arr2) {
  var result = [];
  for (var i = 0; i < range_arr1.length; i++) {
    for (var j = 0; j < range_arr2.length; j++) {
      if (range_arr1[i].intersect(range_arr2[j]) !== null) {
        result.push(range_arr1[i].intersect(range_arr2[j]));
      }
    }
  }
  console.log(result);
  return result;
}

/* DATE COMPARATOR OBJECT (IN JAVASCRIPT) */
function dateSort(obj1, obj2) {
  var a_args = obj1.date.split('-');
  var b_args = obj2.date.split('-');
  var a = new Date(parseInt(a_args[0]),
                   parseInt(a_args[1]) - 1,
                   parseInt(a_args[2]));
  var b = new Date(parseInt(b_args[0]),
                   parseInt(b_args[1]) - 1,
                   parseInt(b_args[2]));
  return a - b;
}

/* TIME COMPARATOR OBJECT (IN JAVASCRIPT) */
function timeSort(a, b) {
    var a_hr_start = parseInt(a.substr(0, 2));
    var b_hr_start = parseInt(b.substr(0, 2));
    var a_min_start = parseInt(a.substr(3, 2));
    var b_min_start = parseInt(b.substr(3, 2));
    
    if (a_hr_start === b_hr_start) {
        return a_min_start - b_min_start;
    }
    else {
        return a_hr_start - b_hr_start;
    }
}

/* DATE-TIME COMPARATOR OBJECT (IN JAVASCRIPT) */
function DateTimeSort(dt1, dt2) {
    dt1.times = dt1.times.sort(timeSort);
    dt2.times = dt2.times.sort(timeSort);
    return dateSort(dt1, dt2);
}

/* INPUT VALIDATION FUNCTION */
function validate(inputName) {
  var sample = inputName.toLowerCase();

  if (sample.length === 0) {
    window.alert("You have not filled in your name. Please enter a name.");
    return false;
  }
  else if (sample.replace(/[a-zA-Z\s]/g,"").length > 0) {
    window.alert("Your name should only contain a-z or A-Z. Please enter a proper name again.");
    return false;
  }
  else {
    for (var i = 0; i < keywords.length; i = i + 1) {
      if (sample.includes(keywords[i])) {
        window.alert("Your name is invalid. Please enter a proper name again.");
        return false;
      }
    }
    return true;
  }
}

function dt_convert(dtstr) {
  dtstr = dtstr.substr(0, dtstr.length - 1);
  var dt_array = dtstr.split(',').sort();
  var userSchedule = [];
  var index = -1;

  for (var i = 0; i < dt_array.length; i++) {
    // temp = [date, startTime, 'to', endTime]
    var temp = dt_array[i].split(' ');
    // starting phase when userSchedule is empty
    if (userSchedule[index] === undefined) {
      userSchedule.push({
        date: temp[0],
        times: [(temp[1] + ' ' + temp[3])]
      });
      index += 1;
    }
    // if next element in dt_array has same date as object pointed to in userSchedule
    else if (userSchedule[index].date === temp[0]) {
      userSchedule[index].times.push((temp[1] + ' ' + temp[3]));
    }
    // if next element has a different date
    else {
      userSchedule.push({
        date: temp[0],
        times: [(temp[1] + ' ' + temp[3])]
      });
      index += 1;
    }
  }

  return userSchedule;
}

/* ========== !PREDEFINED FUNCTIONS FOR MANUAL.HTML USER FORM USAGE ========== */