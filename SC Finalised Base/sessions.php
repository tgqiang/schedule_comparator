<?php
  session_start();

  /* CREATE CONNECTION */
  $mysqli = new mysqli('localhost', 'root', '', 'schedulecomparator');
  
  /* CHECKS CONNECTION */
  if ($mysqli->connect_errno) {
    echo $mysqli->connect_error;
    die("MySQL connection failed.");
  }
  
  if (isset($_GET['id_init']) && isset($_GET['option']) && isset($_GET['submit'])) {
    $_SESSION['sessionID'] = $_GET['id_init'];
    $usedID = $mysqli->query("DESCRIBE " . $_SESSION['sessionID']);
    if ($usedID !== FALSE) {
      $mysqli->close();
      echo "<script>window.alert('Input session ID is already in use. Please re-enter another desired ID.')</script>";
      $_SESSION['sessionID'] = NULL;
      //header("Location: sessions.php");
    }
    else {
      $_SESSION['create'] = true;
      if ($_GET['option'] === "Manual comparison") {
        $_SESSION['manual'] = true;
        header("Location: ./manual.php?sessionID=" . $_GET['id_init']);
      }
      else if ($_GET['option'] === "Timetable comparison") {
        $_SESSION['timetable'] = true;
        header("Location: ./upload.php" . "?sessionID=" . $_GET['id_init']);
      }
      else {

      }
    }
  }
  else if (isset($_GET['id_init']) && !isset($_GET['option']) && isset($_GET['submit'])) {
    $_SESSION['sessionID'] = $_GET['id_init'];
    $_SESSION['join'] = true;
    header("Location: ./manual.php?sessionID=" . $_GET['id_init']);
  }
  else {

  }
?>
<!DOCTYPE HTML>
<!--sessions.html-->
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
          <li><a href="Schedule%20Comparator.html">Home</a></li>
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
        <p id="initialise">To create/join a session, <button id="session_init">click here.</button></p>
        <!-- SESSION FORM HERE, IN POP-UP DIALOG -->
        <form title="Create/join session" id="session_form" action="sessions.php" method="get">
          <fieldset>
            <label for="session_name">Enter session ID:</label>
            <input type="text" name="id_init" id="session_id" class="text ui-widget-content ui-corner-all">
            <label for="create_option">For session creation only - type of comparison to use:</label>
            <input type="radio" name="option" value="Manual comparison">Manual comparison
            <br>
            <input type="radio" name="option" value="Timetable comparison">Timetable comparison
            <br>
            <br>
            <p>To create session, fill in session ID <u>AND</u> comparison option and click on button.</p>
            <p>To join session, fill in session ID <u>ONLY</u> and click on button.</p>
            <br>
            <!-- Allow form submission with keyboard without duplicating the dialog button -->
            <input id="create_submit" name="submit" type="submit" value="Create/join session">
            <!--<input id="join_submit" name="join" type="submit" value="Join session">-->
          </fieldset>
        </form>
    </div>

  </body>
</html>
