<?php
/* 
 * // REDIRECTURL.PHP FOR UPLOAD.PHP //
 * THIS PHP PROGRAM RETURNS THE FULL URL FROM THE CONDENSED VERSION OF URL.
 * PLEASE DO NOT MODIFY THIS PROGRAM OR APPLICATION WILL NOT WORK AS INTENDED.
 */

header('Access-Control-Allow-Methods: GET');
header('Access-Control-Max-Age: 1000');
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
function getRedirectUrl ($url) {
  stream_context_set_default(array(
    'http' => array(
      'method' => 'HEAD'
    )
  ));
  $headers = get_headers($url, 1);
  if ($headers !== false && isset($headers['Location'])) {
    return $headers['Location'];
  }
  return false;
}
$timetableUrl = $_GET['address'];
$redirectedUrl = getRedirectUrl($timetableUrl);
if (!$redirectedUrl) {
  $redirectedUrl = $timetableUrl;
}

echo json_encode($redirectedUrl);
?>