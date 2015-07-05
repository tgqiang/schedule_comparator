<?php
/* ADDING USER ENTRY VIA QUERY TO DATABASE TO INSERT ROW OF VALUES (NAME & URL) */
session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$result = $db->query("INSERT INTO " . $_SESSION['sessionID'] . " VALUES ('" . $_GET['person'] . "', '" . $_GET['address'] . "')");

$db->close();
return $result;
?>