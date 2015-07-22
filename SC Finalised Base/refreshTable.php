<?php
/* 
 * // REFRESHTABLE.PHP FOR MANUAL.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO RETRIEVE ALL
 * USER ENTRIES IN HTML TABLE FORM AND RETURNS THIS RESULT TO DISPLAY IN THE
 * MANUAL.PHP PAGE.
 */

/* START SESSION */
session_start();

/* ESTABLISH CONNECTION */
$db = new mysqli("localhost", "865880", "Tgqiang1993", "865880");

/* SELECTS THE ENTIRE TABLE FOR DISPLAY TO HTML/PHP PAGE */
$table = $db->query("SELECT * FROM " . $_SESSION['sessionID'] . " WHERE 1;");

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