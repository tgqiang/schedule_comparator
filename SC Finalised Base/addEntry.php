<?php
/* 
 * // ADDENTRY.PHP FOR MANUAL.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO ADD A ROW ENTRY
 * COMPRISING OF THE USER'S NAME AND STRING OF DATES WHERE USER IS AVAILABLE
 * INTO CORRESPONDING SESSION TABLE
 */

session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$result = $db->query("INSERT INTO " . $_SESSION['sessionID'] . " VALUES ('" . $_GET['person'] . "', '" . $_GET['dates'] . "')");

$db->close();
?>