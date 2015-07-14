<!--
  * // SESSIONS.PHP //
  * PAGE FOR SESSION CREATION
  * ATTN: FURTHER TESTING IS NEEDED TO ENSURE INTEGRITY OF APPLICATION FUNCTIONALITY
  * IN-DEPTH TESTING AS A CREATOR OR JOINER MORE CONVENIENTLY DONE AFTER APP IS
  * DEPLOYED, IF NOT DIFFERENT BROWSERS HAVE TO BE USED. NEED TO TEST WHETHER IT WORKS
  * ACROSS MOST BROWSERS.
-->
<?php
  /* START BROWSER SESSION */
  session_start();

  /* CREATE CONNECTION */
  $mysqli = new mysqli('localhost', 'root', '', 'schedulecomparator');
  
  /* CHECKS CONNECTION */
  if ($mysqli->connect_errno) {
    echo $mysqli->connect_error;
    die("MySQL connection failed.");
  }
  
  /* USER REDIRECTION FOR SESSION CREATION */
  if (isset($_GET['id_create']) && isset($_GET['option']) && isset($_GET['create_submit'])) {
    $_SESSION['sessionID'] = $_GET['id_create'];
    $usedID = $mysqli->query("DESCRIBE " . $_SESSION['sessionID']);
    /* IF ID GENERATED IS ALREADY USED BY ANOTHER GROUP */
    if ($usedID !== FALSE) {
      echo "<script>window.alert('Input session ID is already in use. Please re-enter another desired ID.')</script>";
      $_SESSION['sessionID'] = NULL;
    }
    else {
      $_SESSION['create'] = true;
      /* IF-ELSE STATEMENT FOR REDIRECTION TO RESPECTIVE PAGES FOR SESSION-CREATOR */
      if ($_GET['option'] === "Manual comparison") {
        $_SESSION['manual'] = true;
        $mysqli->query("INSERT INTO sessionoptions (id, method) VALUES ('" . $_SESSION['sessionID'] . "', 'manual')");
        header("Location: ./manual.php?sessionID=" . $_GET['id_create']);
      }
      else if ($_GET['option'] === "Timetable comparison") {
        $_SESSION['timetable'] = true;
        $mysqli->query("INSERT INTO sessionoptions (id, method) VALUES ('" . $_SESSION['sessionID'] . "', 'upload')");
        header("Location: ./upload.php?sessionID=" . $_GET['id_create']);
      }
      else {

      }
    }
  }
  
  /* IF-ELSE STATEMENT FOR USER REDIRECTION FOR SESSION-JOINERS */
  else if (isset($_GET['id_join']) && isset($_GET['join_submit'])) {
    $invalidID = $mysqli->query("DESCRIBE " . $_SESSION['sessionID']);
    if ($invalidID !== FALSE) {
      $_SESSION['sessionID'] = $_GET['id_join'];
      $_SESSION['join'] = true;
      $table = $mysqli->query("SELECT method FROM sessionoptions WHERE id='" . $_SESSION['sessionID'] . "'");
      $option = $table->fetch_row();
      if ($option[0] === "manual") {
        header("Location: ./manual.php?sessionID=" . $_GET['id_join']);
      }
      else if ($option[0] === "upload") {
        header("Location: ./upload.php?sessionID=" . $_GET['id_join']);
      }
      else {
        
      }
    }
    else {
      echo "<script>window.alert('This session does not exist. Please ensure that session ID comes from an existing session.')</script>";
      $_SESSION['sessionID'] = NULL;
    }
  }

  /* INVALID OPTIONS: DO NOTHING */
  else {

  }
?>
<!DOCTYPE HTML>
<html>
  <head>
    <!-- ALL STYLES AND SCRIPTS ARE HERE -->
    <link type="text/css" rel="stylesheet" href="bootstrap.css">
    <link type="text/css" rel="stylesheet" href="jquery-ui.css">
    <link type="text/css" rel="stylesheet" href="base.css">
    <script src="jquery.js"></script>
    <script src="jquery-ui.js"></script>
    <script src="jquery-ui.multidatespicker.js"></script>
    <script type="text/javascript" src="sessions.js"></script>
    <title>Schedule Comparator</title>
  </head>

  <body>
    <div class="nav">
      <div class="container">
        <ul class="pull-left">
          <!-- BASE NAVIGATION FOR COMPARATOR -->
          <li><a href="ScheduleComparator.html">Home</a></li>
        </ul>

        <ul class="pull-right">
          <!-- USEFUL LINKS IN ACCORDION EFECT -->
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

    <div id="session-page" class="jumbotron">
      <div id="center" class="container">
        <!-- SESSIONS OPTIONS HANDLER HERE -->
        <h2>Sessions</h2>
        <br>
        <p id="create_initialise">To create a session, <button id="create_session_init">click here.</button></p>
        <p id="join_initialise">To join a session, <button id="join_session_init">click here.</button></p>
        <!-- SESSION CREATE FORM HERE, IN POP-UP DIALOG -->
        <form title="Create session" id="session_create_form" action="sessions.php" method="get">
          <fieldset>
            <label><u>Create session</u></label>
            <label for="session_name">Session ID:</label>
            <input type="text" name="id_create" id="session_id_create" class="text ui-widget-content ui-corner-all" readonly>
            <button onclick="generateID()">Generate ID</button>
            <br>
            <label for="create_option">Type of comparison to use:</label>
            <br>
            <input type="radio" name="option" id="manual_option" value="Manual comparison">Manual comparison
            <br>
            <input type="radio" name="option" id="url_option" value="Timetable comparison">Timetable comparison
            <br>
            <br>
            <input id="create_submit" name="create_submit" type="submit" value="Create session">
            <br>
          </fieldset>
        </form>
        <!-- SESSION JOIN FORM HERE, IN POP-UP DIALOG -->
        <form title="Join session" id="session_join_form" action="sessions.php" method="get">
          <fieldset>
            <label><u>Join session</u></label>
            <label for="session_name">Enter session ID:</label>
            <input type="text" name="id_join" id="session_id_join" class="text ui-widget-content ui-corner-all">
            <br>
            <!-- Allow form submission with keyboard without duplicating the dialog button -->
            <input id="join_submit" name="join_submit" type="submit" value="Join session">
          </fieldset>
        </form>
    </div>

  </body>
</html>
