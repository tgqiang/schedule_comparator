<?php
/* 
 * // COMPUTEDATES.PHP FOR MANUAL.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO RETRIEVE ALL
 * EXISTING USERS' DATE-TIME ENTRIES
 */

/* START SESSION */
session_start();

/* ESTABLISH CONNECTION */
$db = new mysqli("mysql2.000webhost.com", "a9602174_orbital", "user12345", "a9602174_orbital");

$table = $db->query("SELECT dates FROM " . $_SESSION['sessionID'] . " WHERE 1;");
$count = $table->num_rows;
$result = array();

while ($row = $table->fetch_row()) {
	array_push($result, json_decode($row[0]));
}

/* CLOSE RESULT SET WHEN DONE */
$db->close();

/* RETURN RESULT IN JSON-ENCODED FORMAT */
echo json_encode($result);
?>