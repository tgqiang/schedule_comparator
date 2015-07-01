<?php
session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');

$table = $db->query("SELECT dates FROM " . $_SESSION['sessionID'] . " WHERE 1;");

//$copy = $table->store_result();
$count = $table->num_rows;
$result = '';

while ($row = $table->fetch_row()) {
	$result .= $row[0] . ", ";
}

$db->close();
echo substr($result, 0, -2) . $count;
?>