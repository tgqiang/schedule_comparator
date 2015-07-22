/*
 * // UPLOAD.JS FOR UPLOAD.PHP //
 * CONTAINS ALL THE SCRIPTING FOR UPLOAD.PHP.
 * IF DESIRED, CODE TO CHECK WHICH JSON FILE TO LOAD CAN BE WRITTEN IN HERE (TO SAVE CODE MAINTAINING)
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


/* VARIABLE TO HANDLE AJAX REQUESTS */
var xmlhttp = new XMLHttpRequest();

/*
 * WEEKARRAY VARIABLE
 * sets up 2D-array for computing common dates and times to meet up
 * for every 1/2 hr interval from 8am to 11pm each day
*/
var weekArray = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Mon
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Tue
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Wed
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Thur
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]; // Fri

/* VARIABLE TO STORE JSON DATA */
var moduleObjects;

/* GRABBING DATA FROM NUSMODS WITH NUSMODS API
(AUTO RETRIEVE FEATURE NOT DONE) */
$.getJSON('http://api.nusmods.com/2015-2016/1/modules.json',
          function (data) {
            moduleObjects = data;
          })

/* READY FUNCTIONS */
$(document).ready(function() {
  /* ================= PAGE READY HANDLER ================= */
  // ACCORDION EFFECT FOR USEFUL LINKS
	$(".accordion").accordion({
    collapsible: true,
    active: false
  });
  
  // TEST IF ENTRY-ADDED HANDLER
  if (window.sessionStorage.getItem("added") === "true") {
    $("#create-user").hide();
    $("#edit-self").show();
  }
  else {
    $("#edit-self").hide();
  }

  /* ================= PAGE READY HANDLER ================= */

	/* =============== 'X' BUTTON EXIT HANDLER =============== */
  // IF USER CLICKS 'X' BUTTON OF THE BROWSER
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

  /* ========== UPLOAD.HTML USER FORM SCRIPTING ========== */
  var dialog, form,
 
  name = $("#name"),
  address = $('#address');

  /* NAME VALIDATION FUNCTION:
  -> NAME MUST NOT BE EMPTY
  -> REAL/FULL NAME NOT REQUIRED
  -> ATTEMPTS TO DETECT SENSITIVE SQL KEYWORDS INSIDE TO PREVENT SQL INJECTIONS
  */
  function name_Fill_Validate(inputName) {
    if (inputName.val().length === 0) {
      window.alert("Name is not filled. Please fill in a name.");
      return false;
    } else {
      return validate(inputName.val());
    }
  }
  
  /* URL VALIDATION FUNCTION:
  -> URL MUST NOT BE EMPTY
  -> URL MUST BE PROVEN TO BE FROM NUSMODS ONLY
     (STRICTLY URL FORMAT, NO OTHER SOURCES/FORMATS ACCEPTABLE)
  */
  function url_Fill_Validate(urlstr) {
    /* TEST FOR URL IN THE FORM OF 'HTTP://MODSN.US/...' */
    var test1 = urlstr.substr(0, 16) === 'http://modsn.us/' &&
                urlstr.substr(16).replace(/\w|[\=\[\]\&\?\/\.\:\-]/gi, '').length === 0;

    /* TEST FOR URL IN THE FORM OF 'HTTP://NUSMODS.COM/TIMETABLE/...' */
    var test2 = urlstr.substr(0, 30) === 'https://nusmods.com/timetable/' &&
                urlstr.substr(30).replace(/\w|[\=\[\]\&\?\/\.\:\-]/gi, '').length === 0;

    /* THIS ARRAY OF KEYWORDS DIFFER ONLY BY 'TABLE' WORD FROM THE ARRAY OF KEYWORDS
       THAT IS PUBLICLY DECLARED (SINCE URL CONTAINS THE WORD 'TABLE')
    */
    var keywords = ["select",
                    "update",
                    "delete",
                    "insert",
                    "create",
                    "alter",
                    "drop",
                    "into",
                    "database",
                    "index",
                    "or ",
                    "and "];

    /* IF INPUT IS EMPTY */
    if (urlstr.length === 0) {
      window.alert("You have not filled in an NUSMods timetable URL, please enter in your timetable URL.");
      return false;
    }

    /* IF INPUT IS NOT A VALID NUSMODS URL */
    else if (!(test1 || test2)) {
      window.alert("Input URL does not seem to come from NUSMods or is invalid. Please enter a valid NUSMods timetable URL.");
      return false;
    }

    /* IF INPUT PASSES FIRST CHECK */
    else {
      for (var i = 0; i < keywords.length; i = i + 1) {
        if (urlstr.includes(keywords[i])) {
          window.alert("Input URL seems to be an invalid one. Please enter a proper NUSMods timetable URL.");
          return false;
        }
      }
      return true;
    }
  }
 
  function addUser() {
   /* THIS IS TO ENSURE THE ADDRESS AND THE NAME IS FILLED */
   var valid = name_Fill_Validate(name) &&
                url_Fill_Validate(address.val());
    
    if (valid) {
      var inputURL = address.val();
      /* IF INPUT URL IS IN CONDENSED FORM */
      if (inputURL.substr(0, 16) === 'http://modsn.us/') {
        var redirectedURL = $.get('redirectURL.php',
                                  {
                                    address: address.val(),
                                  },
                                  function(data) {
                                    return data;
                                  });
        console.log(redirectedURL);
        var userSchedule = getSchedule(redirectedURL);
        $.get('addEntryURL.php',
              {
                person: name.val(),
                address: data,
                schedule: userSchedule,
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
      /* IF INPUT URL IS IN ORIGINAL FORM */
      else {
        var userSchedule = getSchedule(inputURL);
        $.get('addEntryURL.php',
              {
                person: name.val(),
                address: address.val(),
                schedule: userSchedule,
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
    }
    else {
      event.preventDefault();
    }
  }

  function updateUser() {
   /* THIS IS TO ENSURE THE DATE AND THE NAME IS FILLED */
   var valid = name_Fill_Validate(name) &&
                url_Fill_Validate(address.val());
    
    if (valid) {
      var inputURL = address.val();
      /* IF INPUT URL IS IN CONDENSED VERSION */
      if (inputURL.substr(0, 16) === 'http://modsn.us/') {
        var redirectedURL = $.get('redirectURL.php',
                                  {
                                    address: address.val(),
                                  },
                                  function(data) {
                                    return data;
                                  });
        console.log(redirectedURL);
        $.get('addEntryURL.php',
              {
                person: name.val(),
                address: data,
                schedule: userSchedule,
              },
              function(data) {
                window.alert(data);
                dialog.dialog("close");
              });
      }
      /* IF INPUT URL IS IN ORIGINAL FORM */
      else {
        var userSchedule = getSchedule(JSON.parse(inputURL));
        $.get('addEntryURL.php',
              {
                person: name.val(),
                address: inputURL,
                schedule: userSchedule
              },
              function(data) {
                window.alert(data);
              });
      }
      dialog.dialog("close");
    }
    else {
      event.preventDefault();
    } 
  }
  
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

  /* FORM CONFIGURATIONS */
  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 300,
    width: 350,
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

  /* BUTTON-CLICK HANDLER WHEN USER INTENDS TO APPEND/MODIFY HIS/HER OWN ENTRY */
  $("#create-user, #edit-self").button().on("click", function() {
    dialog.dialog("open");
  });

  /* BUTTON-CLICK HANDLER THAT REFRESHES TABLE THAT IS DISPLAYED */
  $("#reset-table").button().on("click", function() {
    $("tr#entry, td#entry").remove();
    $("#users tbody").load('refreshTableURL.php', function(result) {
      alert("Table refreshed.");
    });
  });

  /* BUTTON-CLICK HANDLER FOR COMMON DATE-TIME COMPUTATION */
  $("#compute").button().on("click", function() {
    $.get('computeDatesURL.php', function(data) {
      window.alert("These are the times that all of you are available:\n\n" + data);
    });
  });
  /* ========== !UPLOAD.HTML USER FORM SCRIPTING ========== */
})

/* ========== PREDEFINED FUNCTIONS FOR MANUAL.HTML USER FORM USAGE ========== */
/* INPUT VALIDATION FUNCTIONS */
function validate(inputName) {
  var sample = inputName.toLowerCase();

  if (sample.length === 0) {
    window.alert("You have not filled in a name. Please fill in a name.");
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

/* FUNCTION TO RETRIEVE SCHEDULE FROM USER-SUPPLIED NUSMODS URL */
function getSchedule(url) {
  /* --- URL PRE-PROCESSING --- */
  url = url.substring(43).replace(/\?|\%5B|\%5D|\&|[\[\]]/ig, ' ').replace(/=/g, ''); // eliminates unwanted stuff in URL
  var semester = parseInt(url.substring(0, 1)); // stores semester
  var url_args = url.substring(2).split(' '); // stores modules data
  var date_time_array = [];
  var timetable;

  /* FUNCTION THAT RETRIEVES AN INDIVIDUAL'S NUS SCHEDULE FOR SETTING WEEKARRAY */
  function retrieve_Date_Time(arr) {
    for (var i = 0; i < arr.length; i += 3) {
      for (var x = 0; x < moduleObjects.length; x++) {
        if (moduleObjects[x].ModuleCode === arr[i]) {
          timetable = moduleObjects[x].Timetable;
          
          for (var y = 0; y < timetable.length; y++) {
            if (timetable[y].LessonType === customConvert(1, arr[i + 1]) &&
                timetable[y].ClassNo === arr[i + 2]) {
              date_time_array.push([timetable[y].DayText, timetable[y].StartTime, timetable[y].EndTime]);
            }
          }
        }
      }
    }
  }
  
  retrieve_Date_Time(url_args);
  return setTimes(date_time_array);
}

/* FUNCTION TO SET OCCUPIED SCHEDULES IN WEEKARRAY */
function setTimes(dt_arr) {
  for (var n = 0; n < dt_arr.length; n++) {
    if (dt_arr[n][2] === '2330' || dt_arr[n][2] === '2359') {
      for (var start = customConvert(3, dt_arr[n][1], 'index'); start <= 30; start++) {
        weekArray[customConvert(2,dt_arr[n][0], 'index')][start] += 1;
      }
    }
    else {
      for (var start = customConvert(3, dt_arr[n][1], 'index'); start < customConvert(3, dt_arr[n][2], 'index'); start++) {
        weekArray[customConvert(2,dt_arr[n][0], 'index')][start] += 1;
      }
    }
  }
  return calculateAvailable();
}

/* FUNCTION THAT RETURNS LONG STRING OF INDEXES WHERE USER IS FREE
   (FOR USE IN PROCESSING WITHIN PHP FILE LATER ON)
*/
function calculateAvailable() {
  var times = '';
  for (var j = 0; j < weekArray.length; j++) {
    for (var k = 0; k < weekArray[j].length; k++) {
      if (weekArray[j][k] === 0) {
        times += (j + '' + k + ' ');
      }
    }
  }
  return times.trim();
}

// PREDEFINED CUSTOM CONVERSION FUNCTION
// option 1: typeCode --> typeCode in JSON file
// option 2: 
//   dir = 'index': DayText (String) --> index (Integer)
//   dir = 'day': index (Integer) --> DayText (String)
// option 3:
//   dir = 'index': time (String) --> index (Integer) (8am -> index 0, ... ...)
//   dir = 'time' : index (Integer) ---> time (String)
// arg: typeCode (String) / DayText (String) / time (String) / index (Integer)

function customConvert(option, arg, dir) {
  if (option === 1) {
    switch (arg) {
      case 'LEC':
        return 'Lecture';
        break;
      case 'TUT':
        return 'Tutorial';
        break;
      case 'SEC':
        return 'Sectional Teaching';
        break;
      case 'LAB':
        return 'Laboratory';
        break;
      case 'REC':
        return 'Recitation';
        break;
      default:
        return 'Invalid typeCode.';
    }
  }
  else if (option === 2) {
    if (dir === 'index') {
      switch (arg) {
        case 'Monday':
          return 0;
          break;
        case 'Tuesday':
          return 1;
          break;
        case 'Wednesday':
          return 2;
          break;
        case 'Thursday':
          return 3;
          break;
        case 'Friday':
          return 4;
          break;
        case 'Saturday':
          return 5;
          break;
        case 'Sunday':
          return 6;
          break;
        default:
          return 'Invalid DayText.';
      }
    }
    else if (dir === 'day') {
      switch (arg) {
        case 0:
          return 'Monday';
          break;
        case 1:
          return 'Tuesday';
          break;
        case 2:
          return 'Wednesday';
          break;
        case 3:
          return 'Thursday';
          break;
        case 4:
          return 'Friday';
          break;
        case 5:
          return 'Saturday';
          break;
        case 6:
          return 'Sunday';
          break;
        default:
          return 'Invalid index.';
      }
    }
    else {
      return 'Invalid direction.';
    }
  }
  else if (option === 3) {
    if (dir === 'index') {
      return Math.round((parseInt(arg) / 100 - 8) * 2);
    }
    else if (dir === 'time') {
      if (arg < 4) {
        return '0' + ((Math.floor(arg / 2) + 8) * 100 + (arg % 2) * 30);
      }
      else {
        return '' + ((Math.floor(arg / 2) + 8) * 100 + (arg % 2) * 30);
      }
    }
    else {
      return 'Invalid direction.';
    }
  }
  else {
    return 'Invalid option.';
  }
}

/* ========== !PREDEFINED FUNCTIONS FOR MANUAL.HTML USER FORM USAGE ========== */