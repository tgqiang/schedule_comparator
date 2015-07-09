<?php
/* 
 * // ADDENTRYURL.PHP FOR UPLOAD.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO ADD A ROW ENTRY
 * COMPRISING OF THE USER'S NAME, URL AND ARRAY INDEXES WHERE USER IS AVAILABLE
 * INTO CORRESPONDING SESSION TABLE
 */

session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$result = $db->query("INSERT INTO " . $_SESSION['sessionID'] . " VALUES ('" . $_GET['person'] . "', '" . $_GET['address'] . "', '" . $_GET['schedule'] . "')");

$db->close();
?>