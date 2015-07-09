<?php
/*
 * // WINDOWCLOSE.PHP FOR BOTH MANUAL.PHP AND UPLOAD.PHP //
 * THIS PHP PROGRAM HANDLES THE EVENT WHERE USER EXITS WITH THE 'X' BUTTON IN THE
 * BROWSER INSTEAD OF USING THE RECOMMENDED METHOD.
 */

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