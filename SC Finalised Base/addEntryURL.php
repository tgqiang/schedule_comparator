<?php
/* 
 * // ADDENTRYURL.PHP FOR UPLOAD.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO ADD A ROW ENTRY
 * COMPRISING OF THE USER'S NAME, URL AND ARRAY INDEXES WHERE USER IS AVAILABLE
 * INTO CORRESPONDING SESSION TABLE
 */

session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$nameUsed = $db->query("SELECT person FROM " . $_SESSION['sessionID'] . " WHERE person='" . $_GET['person'] . "' LIMIT 1");

if ($nameUsed->num_rows !== 0 && !isset($_SESSION['added'])) {
	echo "Name has been used by someone else in this session. Please enter in another name.";
}
else if (isset($_SESSION['added'])) {
	$result = $db->query("UPDATE " . $_SESSION['sessionID'] . " SET url='" . $_GET['address'] . "', indexstr='" . $_GET['schedule'] . "' WHERE person='" . $_GET['person'] . "';");
	echo "Your entry is successfully updated.";
}
else {
	$_SESSION['added'] = $_GET['added'];
	$result = $db->query("INSERT INTO " . $_SESSION['sessionID'] . " VALUES ('" . $_GET['person'] . "', '" . $_GET['address'] . "', '" . $_GET['schedule'] . "')");
	echo "Your entry has been successfully added.";
}

$db->close();
?>