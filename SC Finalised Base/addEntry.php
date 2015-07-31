<?php
/* 
 * // ADDENTRY.PHP FOR MANUAL.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO ADD OR UPDATE
 * A ROW ENTRY COMPRISING OF THE USER'S NAME AND STRING OF DATE-TIMES WHERE USER IS
 * AVAILABLE INTO CORRESPONDING SESSION TABLE
 */

/* START SESSION */
session_start();

/* ESTABLISH CONNECTION */
$db = new mysqli("mysql2.000webhost.com", "a9602174_orbital", "user12345", "a9602174_orbital");

/* MYSQL QUERY VIA PHP TO TEST WHETHER NAME IS USED */
$nameUsed = $db->query("SELECT person FROM " . $_SESSION['sessionID'] . " WHERE person='" . $_GET['person'] . "' LIMIT 1");

/* IF NAME IS ALREADY USED */
if ($nameUsed->num_rows !== 0  && !isset($_SESSION['added'])) {
	echo "Name has been used by someone else in this session. Please enter in another name.";
}

/* IF USER UPDATES OWN ENTRY */
else if (isset($_SESSION['added'])) {
	$result = $db->query("UPDATE " . $_SESSION['sessionID'] . " SET dates='" . $_GET['schedule'] . "' WHERE person='" . $_GET['person'] . "';");
	echo "Your entry has been successfully updated.";
}

/* IF USER ADDS OWN ENTRY */
else {
	$_SESSION['added'] = $_GET['added'];
	$result = $db->query("INSERT INTO " . $_SESSION['sessionID'] . " VALUES ('" . $_GET['person'] . "', '" . $_GET['schedule'] . "')");
	echo "Your entry has been successfully added.";
}

/* CLOSES RESULT SET WHEN DONE */
$db->close();
?>