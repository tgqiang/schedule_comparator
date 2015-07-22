<?php
/* 
 * // COMPUTEDATESURL.PHP FOR UPLOAD.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO RETRIEVE ALL
 * USER ENTRIES FOR NAME AND FULL URLS IN THE FORM OF HTML TABLE AND RETURNS THIS
 * RESULT TO DISPLAY IN UPLOAD.PHP PAGE.
 */

/* START SESSION */
session_start();

/* ESTABLISH CONNECTION */
$db = new mysqli("localhost", "865880", "Tgqiang1993", "865880");

/* MYSQL QUERY TO RETRIEVE TABLE */
$table = $db->query("SELECT person, url FROM " . $_SESSION['sessionID'] . " WHERE 1;");

$result = '';

while ($row = $table->fetch_row()) {
	$result .= "<tr id='entry'>";
	$result .= "<td id='entry'>" . $row[0] . "</td>";
	$result .= "<td id='entry'>" . $row[1] . "</td>";
	$result .= "</tr>";
}

/* CLOSE RESULT SET WHEN DONE */
$db->close();

/* RETURNS TABLE IN HTML FORMAT */
echo $result;
?>