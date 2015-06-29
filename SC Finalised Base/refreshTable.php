<?php
//require ('manual.php?sessionID=' . $_SESSION['sessionID']);
session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$table = $db->query("SELECT * FROM " . $_SESSION['sessionID'] . " WHERE 1;");

/*
$row = $table->fetch_array(MYSQLI_ASSOC);
$result = "<tr id='entry'>" . "<td id='entry'>" . $row['person'] . "</td>";
$result .= "<td id='entry'>" . $row['dates'] . "</td>" . "</tr>";
*/

$result = '';

while ($row = $table->fetch_row()) {
	$result .= "<tr id='entry'>";
	$result .= "<td id='entry'>" . $row[0] . "</td>";
	$result .= "<td id='entry'>" . $row[1] . "</td>";
	$result .= "</tr>";
}

$db->close();
echo $result;
?>