<?php
/* 
 * // COMPUTEDATESURL.PHP FOR UPLOAD.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO RETRIEVE INDEXES
 * OF ALL EXISTING USERS IN THE FORM OF [[INDEXES_1], [INDEXES_2], ... ...]
 * COMPUTATION OF COMMON INDEXES WHERE EVERYONE IS AVAILABLE IS PERFORMED HERE AND
 * RETURNED AS A STRING RESULT.
 * A PREDEFINED FUNCTION TO PERFORM THE NECESSARY INDEX-TO-TIME CONVERSION IS WRITTEN
 * AND PLACED AT THE BOTTOM OF THIS PAGE, PLEASE DO NOT MODIFY THE FUNCTION UNLESS AN
 * ERROR/BUG THAT AFFECTS THE COMPUTATION RESULT HAS BEEN DETECTED.
 */

session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$table = $db->query("SELECT indexstr FROM " . $_SESSION['sessionID'] . " WHERE 1;");

$count = $table->num_rows;
$temp = array();

while ($row = $table->fetch_row()) {
  $temp2 = explode(' ', $row[0]);
  array_push($temp, $temp2);
}

$result = $temp[0];

for ($i = 1; $i < count($temp); $i++) {
	$result = array_intersect($result, $temp[$i]);
}

$monday = 'Monday:';
$tuesday = 'Tuesday:';
$wednesday = 'Wednesday:';
$thursday = 'Thursday:';
$friday = 'Friday:';

for ($j = 0; $j < count($result); $j++) {
	$day = customConvert(2, intval(substr($result[$j], 0, 1)), 'day');
	$time = customConvert(3, intval(substr($result[$j], 1)), 'time');
	if (strpos($monday, $day) !== FALSE) {
		$monday .= ($time . ' ');
	}
	else if (strpos($tuesday, $day) !== FALSE) {
		$tuesday .= ($time . ' ');
	}
	else if (strpos($wednesday, $day) !== FALSE) {
		$wednesday .= ($time . ' ');
	}
	else if (strpos($thursday, $day) !== FALSE) {
		$thursday .= ($time . ' ');
	}
	else if (strpos($friday, $day) !== FALSE) {
		$friday .= ($time . ' ');
	}
	else {

	}
}

$monday = preg_replace('/\s/', ', ', trim($monday));
$tuesday = preg_replace('/\s/', ', ', trim($tuesday));
$wednesday = preg_replace('/\s/', ', ', trim($wednesday));
$thursday = preg_replace('/\s/', ', ', trim($thursday));
$friday = preg_replace('/\s/', ', ', trim($friday));

echo $monday . "\n\n" . $tuesday . "\n\n" . $wednesday . "\n\n" . $thursday . "\n\n" . $friday;

// PREDEFINED CUSTOM CONVERSION FUNCTION IN PHP
// option 1: typeCode --> typeCode in JSON file
// option 2: 
//   dir = 'index': DayText (String) --> index (Integer)
//   dir = 'day': index (Integer) --> DayText (String)
// option 3:
//   dir = 'index': time (String) --> index (Integer) (8am -> index 0, ... ...)
//   dir = 'time' : index (Integer) ---> time (String)
// arg: typeCode (String) / DayText (String) / time (String) / index (Integer)

function customConvert($option, $arg, $dir) {
  if ($option === 1) {
    switch ($arg) {
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
  else if ($option === 2) {
    if ($dir === 'index') {
      switch ($arg) {
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
    else if ($dir === 'day') {
      switch ($arg) {
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
  else if ($option === 3) {
    if ($dir === 'index') {
      return round((intval($arg) / 100 - 8) * 2);
    }
    else if ($dir === 'time') {
      if ($arg < 4) {
        return '0' . ((floor($arg / 2) + 8) * 100 + ($arg % 2) * 30);
      }
      else {
        return '' . ((floor($arg / 2) + 8) * 100 + ($arg % 2) * 30);
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

?>