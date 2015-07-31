<?php
/*
 * // UPDATEENTRY.PHP FOR MANUAL.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO UPDATE A USER'S
 * OWN ROW ENTRY (UPDATES USER'S STRING OF AVAILABLE DATES).
 */

session_start();
$db = new mysqli("mysql2.000webhost.com", "a9602174_orbital", "user12345", "a9602174_orbital");

$result = $db->query("UPDATE " . $_SESSION['sessionID'] . " SET dates='" . $_GET['dates'] . "' WHERE person='" . $_GET['person'] . "';");

$db->close();
?>