<!--
  * // MANUAL.PHP //
  * PAGE FOR MANUAL OPTION COMPARISON
  * ATTN: FURTHER TESTING IS NEEDED TO ENSURE INTEGRITY OF APPLICATION FUNCTIONALITY
-->
<?php
  /* STARTS A BROWSER SESSION */
  session_start();
  
  /* CREATE CONNECTION */
  $mysqli = new mysqli('localhost', 'root', '', 'schedulecomparator');
  
  /* CHECKS CONNECTION */
  if ($mysqli->connect_errno) {
    echo $mysqli->connect_error;
    die("MySQL connection failed.");
  }

  /* IF USER ADDS ENTRY */
  if (isset($_GET['user_name']) && isset($_GET['input_dates'])) {
    $_SESSION['person'] = $_GET['user_name'];
    $_SESSION['dates'] = $_GET['input_dates'];
  }

  /* IF USER EXITS PROGRAM */
  if (isset($_GET['exit'])) {
    include_once 'windowClose.php';
  }

  /* CREATE */
  function createSession($db) {
    echo $_SESSION['create'];
    /* SQL QUERY TO CREATE TABLE */
    $result = $db->query("CREATE TABLE " . $_SESSION['sessionID'] . " (person VARCHAR(30) NOT NULL, dates VARCHAR(8000));");
  }

  /* JOIN (EFFECTIVELY DOES NOTHING, CAN PLACE CHECKING FUNCTIONS HERE FOR TESTING) */
  function joinSession($db) {
    echo $_SESSION['join'];
  }

  if (isset($_SESSION['create'])) {
    createSession($mysqli);
  }
  else if (isset($_SESSION['join'])) {
    joinSession($mysqli);
  }
  else {
    echo "Variables lost.";
  }
?>
<!DOCTYPE HTML>
<html>
  <head>
    <!-- ALL STYLES AND SCRIPTS HERE -->
    <link type="text/css" rel="stylesheet" href="bootstrap.css">
    <link type="text/css" rel="stylesheet" href="jquery-ui.css">
    <link type="text/css" rel="stylesheet" href="base.css">
    <script src="jquery.js"></script>
    <script src="jquery-ui.js"></script>
    <script src="jquery-ui.multidatespicker.js"></script>
    <script type="text/javascript" src="manual.js"></script>
    <title>Schedule Comparator</title>
  </head>

  <body>
    <div class="nav">
      <div class="container">

        <ul class="pull-right">
          <!-- USEFUL LINKS IN ACCORDION EFFECT -->
          <h3>Useful links</h3>
          <div class="accordion">
            <h3>NUS</h3>
            <ul>
              <li><a href="http://www.nusmods.com/" target="_blank">NUSMods</a></li>
              <li><a href="http://www.comp.nus.edu.sg/" target="_blank">NUS SoC</a></li>
              <li><a href="http://www.cors.nus.edu.sg/" target="_blank">NUS CORS</a></li>
            </ul>

            <h3>Tools</h3>
            <ul>
              <li><a href="https://drive.google.com/" target="_blank">Google Drive</a></li>
              <li><a href="https://www.google.com/calendar/" target="_blank">Google Calendar</a></li>
            </ul>
          </div>  
        </ul>
      </div>
    </div>

    <div id="manual-page" class="jumbotron">
      <div id="center" class="container">
        <!-- MANUAL ENTRY INTERFACE -->
        <h2>Manual Entry</h2>
        <br>

        <div id="dialog-form" title="Add/modify your entry">
          <!-- FORM FOR MANUAL ENTRY -->
          <form>
            <fieldset>
              <label for="name">Name</label>
              <input type="text" name="user_name" id="name" class="text ui-widget-content ui-corner-all">
              <label for="dates">Dates available</label>
              <input type="text" name="input_dates" id="dates" class="text ui-widget-content ui-corner-all" onblur="closeDatePicker()" multiple>
 
              <!-- Allow form submission with keyboard without duplicating the dialog button -->
              <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
            </fieldset>
          </form>
        </div>
 
        <!-- THIS TABLE UPDATES THE GROUP'S SCHEDULES WHEN USER CLICKS UPDATE BUTTON -->
        <div id="users-contain" class="ui-widget">
          <h3>Options:
            <button id="create-user">Add your entry</button>
            <button id="edit-self">Modify your entry</button>
            <button id="reset-table">Update table</button>
            <button id="compute">Compute dates</button>
          </h3>
          <table id="users" class="ui-widget ui-widget-content">
            <thead>
              <tr class="ui-widget-header ">
                <th id="name-heading">Name</th>
                <th id="date-heading">Dates available</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        <br>
        <br>
        <!-- FORM FOR USER TO EXIT (RECOMMENDED METHOD FOR END USERS) -->
        <form action="manual.php" method="get">
          <p>Session initialised/joined. To exit, <input type="submit" name="exit" value="click here">.</p>
        </form>
      </div>
    </div>

  </body>
</html>