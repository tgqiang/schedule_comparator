<?php
  session_start();
  
  /* CREATE CONNECTION */
  $mysqli = new mysqli('localhost', 'root', '', 'schedulecomparator');
  
  /* CHECKS CONNECTION */
  if ($mysqli->connect_errno) {
    echo $mysqli->connect_error;
    die("MySQL connection failed.");
  }

  /* IF USER EXITS PROGRAM */
  if (isset($_GET['exit'])) {
    $mysqli->query("DROP TABLE " . $_SESSION['sessionID'] . ";");
    $mysqli->close();
    session_destroy();
    header("Location: Schedule%20Comparator.html");
  }

  /* CREATE */
  function createSession($db) {
    // sql query to create table
    $result = $db->query("CREATE TABLE " . $_SESSION['sessionID'] . " (person VARCHAR(30) NOT NULL, dates VARCHAR(8000));");
    /*
    if ($result === TRUE) {
        $msg = "Table " . $_SESSION['sessionID'] . " created successfully.";
        print $msg;
    } else {
        echo $db->errno;
        $msg = "Error creating table: " . $db->error;
        print $msg;
    }
    */
  }

  /* JOIN */
  function joinSession($db) {
    // sql query to create table
    $result = $db->query("SELECT * FROM " . $_SESSION['sessionID']);
    /*if ($result !== FALSE) {
        $msg = "Table " . $_SESSION['sessionID'] . " retrieved successfully.";
        print $msg;
    } else {
        $msg = "Error retrieving table: " . $db->error;
        print $msg;
    }
    */
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
<!--help.html-->
<html>
  <head>
    <!-- ALL THE STYLES AND SCRIPTS NEEDED ARE HERE -->
     <link type="text/css" rel="stylesheet" href="bootstrap.css">
    <link type="text/css" rel="stylesheet" href="jquery-ui.css">
    <link type="text/css" rel="stylesheet" href="base.css">
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="jquery-ui.js"></script>
    <script type="text/javascript" src="upload.js"></script>
    <title>Schedule Comparator</title>
  </head>

  <body>
    <div class="nav">
      <div class="container">

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

    <div id="upload-page" class="jumbotron">
      <div id="center" class="container">
        <!-- PLACEHOLDER FOR UPLOAD.HTML FOR NOW -->
        <h2>Timetable Upload</h2>
        <p>Placeholder for NUSMods Timetable URL upload option!</p>
        <br>
        <br>
        <form action="upload.php" method="get">
          <p>Session initialised/joined. To exit, <input type="submit" name="exit" value="click here">.</p>
        </form>
      </div>
    </div>

  </body>
</html>