<?php
/*
 * // UPDATEENTRY.PHP FOR MANUAL.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO UPDATE A USER'S
 * OWN ROW ENTRY (UPDATES USER'S STRING OF AVAILABLE DATES).
 */

session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$result = $db->query("UPDATE " . $_SESSION['sessionID'] . " SET dates='" . $_GET['dates'] . "' WHERE person='" . $_GET['person'] . "';");

$db->close();
?>