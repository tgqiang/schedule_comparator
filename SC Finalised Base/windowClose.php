<?php
/*
 * // WINDOWCLOSE.PHP FOR BOTH MANUAL.PHP AND UPLOAD.PHP //
 * THIS PHP PROGRAM HANDLES THE EVENT WHERE USER EXITS WITH THE 'X' BUTTON IN THE
 * BROWSER INSTEAD OF USING THE RECOMMENDED METHOD.
 */

/* STARTS SESSION */
session_start();

/* ESTABLISHES CONNECTION */
$db = new mysqli("mysql2.000webhost.com", "a9602174_orbital", "user12345", "a9602174_orbital");

/* CHECKS IF USER IS A SESSION-CREATOR OR A JOINER */
if (isset($_SESSION['create'])) {
	$db->query("DROP TABLE " . $_SESSION['sessionID'] . ";");
	$db->query("DELETE FROM sessionoptions WHERE id='" . $_SESSION['sessionID'] . "';");
}

/* CLOSES RESULT SET */
$db->close();

/* DESTROYS ANY STORED SESSION VARIABLES IN PHP */
session_unset();
session_destroy();

/* REDIRECTION TO HOME PAGE */
header("Location: ScheduleComparator.html");
?>