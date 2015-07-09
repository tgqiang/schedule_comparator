<?php
/* 
 * // COMPUTEDATESURL.PHP FOR UPLOAD.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO RETRIEVE ALL
 * USER ENTRIES FOR NAME AND FULL URLS IN THE FORM OF HTML TABLE AND RETURNS THIS
 * RESULT TO DISPLAY IN UPLOAD.PHP PAGE.
 */

session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$table = $db->query("SELECT person, url FROM " . $_SESSION['sessionID'] . " WHERE 1;");

$result = '';

while ($row = $table->fetch_row()) {
	$result .= "<tr id='entry'>";
	$result .= "<td id='entry'>" . $row[0] . "</td>";
	$result .= "<td id='entry'>" . $row[1] . "</td>";
	$result .= "</tr>";
}

$db->close();
echo $result;
?>