<?php
/* 
 * // COMPUTEDATES.PHP FOR MANUAL.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO RETRIEVE ALL
 * EXISTING USERS' STRING OF DATES, APPEND THEM ALL TOGETHER, AND RETURNS A RESULT
 * CONSISTING OF THE FULL STRING OF DATES AND SESSION SIZE
 * => "[DATE_STRING][SESSION_SIZE]"
 */

session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$table = $db->query("SELECT dates FROM " . $_SESSION['sessionID'] . " WHERE 1;");
$count = $table->num_rows;
$result = array();

while ($row = $table->fetch_row()) {
	array_push($result, json_decode($row[0]));
}

$db->close();
echo json_encode($result);
?>