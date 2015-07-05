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
    if (isset($_SESSION['create'])) {
      $mysqli->query("DROP TABLE " . $_SESSION['sessionID'] . ";");
      $mysqli->query("DELETE FROM sessionoptions WHERE id='" . $_SESSION['sessionID'] . "'");
    }
    $mysqli->close();
    session_unset();
    session_destroy();
    header("Location: Schedule%20Comparator.html");
  }

  /* CREATE */
  function createSession($db) {
    /* sql query to create table */
    $result = $db->query("CREATE TABLE " . $_SESSION['sessionID'] . " (person VARCHAR(30) NOT NULL, url VARCHAR(8000));");
  }

  /* JOIN (to work on showing table on load) */
  function joinSession($db) {

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
        <div id="dialog-form" title="Add/modify your entry">
          <!-- FORM FOR MANUAL ENTRY -->
          <form>
            <fieldset>
              <label for="name">Name</label>
              <input type="text" name="user_name" id="name" class="text ui-widget-content ui-corner-all">
              <label for="address">Paste timetable URL here:</label>
              <br>
              <input type="text" name="input_address" id="address" class="text ui-widget-content ui-corner-all">
 
              <!-- Allow form submission with keyboard without duplicating the dialog button -->
              <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
            </fieldset>
          </form>
        </div>
        <br>
        <!-- THIS TABLE UPDATES WHO IN THE GROUP HAS UPLOADED URL -->
        <div id="users-contain" class="ui-widget">
          <h3>Options:
            <button id="create-user">Add your entry</button>
            <!--To allow option to modify own entry-->
            <button id="edit-self">Modify your entry</button>
            <button id="reset-table">Update table</button>
            <!--<button id="compute">Compute dates</button>-->
          </h3>
          <table id="users" class="ui-widget ui-widget-content">
            <thead>
              <tr class="ui-widget-header ">
                <th id="name-heading">Name</th>
                <th id="address-heading">Timetable URL</th>
              </tr>
            </thead>
            <tbody>
              <?php
                include_once 'refreshTable.php';
              ?>
            </tbody>
          </table>
        </div>
        <br>
        <br>
        <form action="upload.php" method="get">
          <p>Session initialised/joined. To exit, <input type="submit" name="exit" value="click here">.</p>
        </form>
      </div>
    </div>

  </body>
</html>