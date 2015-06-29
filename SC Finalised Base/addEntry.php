<?php
//require ('manual.php?sessionID=' . $_SESSION['sessionID']);
session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$result = $db->query("INSERT INTO " . $_SESSION['sessionID'] . " VALUES ('" . $_GET['person'] . "', '" . $_GET['dates'] . "')");

$db->close();
return $result;

?>