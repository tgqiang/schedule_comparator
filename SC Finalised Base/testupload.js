/*
 * // TESTUPLOAD.JS //
 * THIS FILE CONTAINS A COPY OF THE UPLOAD OPTION DATE COMPUTATION SCRIPTS.
 * RECOMMENDED TO REMOVE ONCE PRODUCT IS DEEMED AS WORKING PERFECTLY FINE.
 */

// VARIABLE TO STORE JSON DATA 
var moduleObjects;

// GRABBING DATA FROM NUSMODS WITH NUSMODS API
/*if () {
  
}
else {
  
}
*/

// pre-processing to be done to url to find out which JSON file to retrieve //
$.getJSON('http://api.nusmods.com/2015-2016/1/modules.json', function (data) {
  moduleObjects = data;
});

// sets up object for computing common dates and times to meet up
// for every 1/2 hr interval from 8am to 11pm each day
var weekArray = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Mon
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Tue
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Wed
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Thur
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Fri
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Sat
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], // Sun

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
}

function calculateAvailable() {
  var times = '';
    for (var j = 0; j < weekArray.length; j++) {
      times += (customConvert(2, j, 'day') + ': ');
      for (var k = 0; k < weekArray[j].length; k++) {
        if (weekArray[j][k] === 0) {
          times += (customConvert(3, k, 'time') + ', ');
        }
      }
      times += '\n';
    }
    alert(times);
  }
};

function getSchedule(url) {
  //--- URL pre-processing ---//
  url = url.substring(43).replace(/\?|\%5B|\%5D|\&/ig, ' ').replace(/=/g, ''); // eliminates unwanted stuff in URL
  console.log(url); // DEBUGGING MSG

  var semester = parseInt(url.substring(0, 1)); // stores semester
  console.log(semester); // DEBUGGING MSG

  var url_args = url.substring(2).split(' '); // stores modules data
  console.log(url_args); // DEBUGGING MSG

  var date_time_array = [];
  var timetable;

  /* FUNCTION THAT RETRIEVES AN INDIVIDUAL'S NUS SCHEDULE */

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
  setTimes(date_time_array);
}
//*/

// PREDEFINED CUSTOM CONVERSION FUNCTION
// CONVERTS LESSON TYPE CODE IN URL TO CORRESPONDING STRING TO LOOK-UP
// option 1: typeCode --> typeCode in JSON file
// option 2: 
//   dir = 'index': DayText (String) --> index (Integer)
//   dir = 'day': index (Integer) --> DayText (String)
// option 3:
//   dir = 'index': time (String) --> index (Integer) (8am -> index 0, ... ...)
//   dir = 'time' : index (Integer) ---> time (String)
// arg: typeCode (String) / DayText (String) / time (String)

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
      return Math.round(parseInt(arg) / 100 - 8) * 2);
    }
    else if (dir === 'time') {
      if (arg < 4) {
        return '0' . ((Math.floor(arg / 2) + 8) * 100 + (arg % 2) * 30);
      }
      else {
        return '' . ((Math.floor(arg / 2) + 8) * 100 + (arg % 2) * 30);
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

/* !TEST UPLOAD JAVASCRIPT */