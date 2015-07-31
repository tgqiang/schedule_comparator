<?php
/*
 * // UPDATEENTRYURL.PHP FOR UPLOAD.PHP //
 * THIS PHP PROGRAM SENDS A QUERY TO SCHEDULECOMPARATOR DATABASE TO UPDATE A USER'S
 * OWN ROW ENTRY (UPDATES URL AND INDEXES FOR A USER).
 */
/* ALLOWS USER TO MODIFY OWN ENTRY VIA QUERY TO UPDATE ENTRY IN DATABASE TABLE */
session_start();
$db = new mysqli("mysql2.000webhost.com", "a9602174_orbital", "user12345", "a9602174_orbital");

$result = $db->query("UPDATE " . $_SESSION['sessionID'] . " SET url='" . $_GET['address'] . "', indexstr='" . $_GET['schedule'] . "' WHERE person='" . $_GET['person'] . "';");

$db->close();
return $result;
?>