<?php
/* HANDLER WHEN USER DOES NOT EXIT APPLICATION BY DEVELOPER-EXPECTED MANNER */
session_start();
$db = new mysqli('localhost', 'root', '', 'schedulecomparator');
if (isset($_SESSION['create']) {
	$db->query("DROP TABLE " . $_SESSION['sessionID'] . ";");
	$db->query("DELETE FROM sessionoptions WHERE id='" . $_SESSION['sessionID'] . "';");
}
$db->close();
session_unset();
session_destroy();
?>