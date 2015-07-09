/* 
 * MANUAL.JS FOR MANUAL.PHP //
 * CONTAINS THE SCRIPTING FOR MANUAL.PHP. PLEASE DO NOT MODIFY THIS FILE UNLESS
 * ERRORS/BUGS ARE DETECTED. ATTN: FURTHER TESTING IS NEEDED TO VERIFY INTEGRITY OF ALL
 * SCRIPTS WRITTEN.
 */

/* SENSITIVE SQL KEYWORDS DEFINED HERE
(TO AVOID DUPLICATE DEFINITIONS IN VALIDATION FUNCTIONS) */
var keywords =   ["select",
                  "update",
                  "delete",
                  "insert",
                  "create",
                  "alter",
                  "drop",
                  "into",
                  "table",
                  "database",
                  "index",
                  "or ",
                  "and "];

/* VARIABLE FOR MANAGING AJAX REQUESTS */
var xmlhttp = new XMLHttpRequest();

/* READY FUNCTIONS */
$(document).ready(function() {
  /* ================= PAGE READY HANDLER ================= */
	// ACCORDION EFFECT FOR NAVIGATIONS
  $(".accordion").accordion({
    collapsible: true,
    active: false
  });

	$(".titles").hover(
		function(){
			$(this).addClass('highlight');
		},
		function(){
			$(this).removeClass('highlight');
		}
	);

  // TEST IF ENTRY-ADDED HANDLER
  if (window.sessionStorage.getItem("added") === "true") {
    $("#create-user").hide();
    $("#edit-self").show();
  }
  else {
    $("#edit-self").hide();
  }
  /* ================= !PAGE READY HANDLER ================= */

  
  /* =============== 'X' BUTTON EXIT HANDLER =============== */
  // IF USER CLICKS 'X' BUTTON OF THE BROWSER (EXCEPTION HANDLING OF IMPROPER EXIT)
  window.addEventListener("beforeunload", function(event) {
    event.returnValue = "It is STRONGLY recommended that you leave this page by exiting the session via the button present in this page instead."; 
  });

  // IF USER CONFIRMS LEAVING PAGE VIA 'X' BUTTON OF THE BROWSER
  window.onunload = function() {
    xmlhttp.open('GET', 'windowClose.php', true);
    xmlhttp.send();
  };
  /* =============== !'X' BUTTON EXIT HANDLER =============== */


	/* ========== MANUAL.HTML USER FORM SCRIPTING ========== */
  var dialog, form,
 
  name = $("#name"),
  dates = $('#dates').multiDatesPicker({
	 dateFormat: "yy-mm-dd",
	 minDate: 0,
  });

  /* NAME VALIDATION FUNCTION:
  -> ATTEMPTS TO DETECT SENSITIVE SQL KEYWORDS IN NAME FIELD TO PREVENT SQL INJECTIONS
  -> NAME CANNOT CONTAIN ANYTHING OTHER THAN ALPHABETS, FULL/REAL NAME NOT REQUIRED
  -> NAME FIELD MUST ALSO NOT BE EMPTY
  */
  function name_Fill_Validate(inputName) {
    if (inputName.val().length === 0) {
      window.alert("Name not filled.");
      return false;
    } else {
      return validate(inputName.val());
    }
  }
  
  /* DATE-FIELD VALIDATION FUNCTION:
  -> ALLOWS DATE FIELD TO BE EMPTY (BUT QUITE POINTLESS FOR THE USERS THEMSELVES)
  -> FURTHER DATE VALIDATION HAS BEEN HANDLED BY MULTIDATEPICKER
     (I.E. ANY ATTEMPTS TO WRITE GIBBERISH IN THE FIELD HAS BEEN ACCOUNTED FOR,
      EXCEPT THE ONLY CASE WHERE USERS CAN WRITE GIBBERISH OF DIGITS AND BACKSLASHES
      BUT THIS DOES NOT CAUSE ANY COMPLICATIONS FOR APP FUNCTIONALITY)
  */
  function isDateFilled(inputDate) {
    if (inputDate.val().length === 0) {
      var proceed = window.confirm("Date field is empty. Proceed?");
      return proceed;
    } else {
      return true;
    }
  }
 
  /* FUNCTION TO ADD USER */
  function addUser() {
 	 /* THIS IS TO ENSURE THE DATE AND THE NAME IS VALIDATED */
   var valid = name_Fill_Validate(name) &&
 	  			  		isDateFilled(dates);
    
    if (valid) {
        $.get('addEntry.php',
              {
                person: name.val(),
                dates: dates.val(),
                added: true
              },
              function() {
                window.alert("Successfully added.");
              });
        window.sessionStorage.setItem("added", "true");
        $("#create-user").hide();
        $("#edit-self").show();
    }
    dialog.dialog("close");     
  }

  /* FUNCTION TO UPDATE USER'S OWN ENTRY */
  function updateUser() {
   /* THIS IS TO ENSURE THE DATE AND THE NAME IS VALIDATED */
   var valid = name_Fill_Validate(name) &&
                isDateFilled(dates);
    
    if (valid) {
        $.get('updateEntry.php',
              {
                person: name.val(),
                dates: dates.val()
              },
              function() {
                window.alert("Successfully updated.");
              });
    }
    dialog.dialog("close");     
  }
  
  /* FUNCTION TO SUBMIT USER ENTRIES (EITHER VIA ADD OR UPDATE) */
  function submitUser() {
    if (window.sessionStorage.getItem("added") === "true") {
      event.preventDefault();
      updateUser();
    }
    else {
      event.preventDefault();
      addUser();
    }
  }

  /* FORM CONFIGURATIONS */
  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      "Add/modify your entry": submitUser,
      Cancel: function() {
        dialog.dialog("close");
      }
    },
    close: function() {
      dialog.dialog("close");
    }
  });
  
  /* FORM SUBMIT EVENT */
  form = dialog.find("form").on("submit", function(event) {
    event.preventDefault();
  });
  
  /* BUTTON-CLICK HANDLER WHEN USER INTENDS TO APPEND/MODIFY HIS/HER OWN ENTRY */
  $("#create-user, #edit-self").button().on("click", function() {
    dialog.dialog("open");
  });

  /* BUTTON-CLICK HANDLER TO REFRESH TABLE THAT IS DISPLAYED */
  $("#reset-table").button().on("click", function() {
    $("tr#entry, td#entry").remove();
    $("#users tbody").load('refreshTable.php', function(result) {
      alert("Table refreshed.");
    });
  });
  
  /* BUTTON-CLICK HANDLER FOR COMMON DATE COMPUTATION:
  -> ATTN: SHOULD WE STICK TO WINDOW.ALERT() OR SHOULD WE PRINT RESULT IN THE HTML?
   */
  $("#compute").button().on("click", function() {
    $(document).load('computeDates.php', function(result) {
      var tablesize = parseInt(result.substring(result.length - 1));
      var arrayOfDates = result.substring(0, result.length - 1).split(", ").sort(datesort);
      compute_Dates(arrayOfDates, tablesize);
    });
  });
  /* ========== !MANUAL.HTML USER FORM SCRIPTING ========== */
})

/* ========== PREDEFINED FUNCTIONS FOR MANUAL.HTML USER FORM USAGE ========== */
/* COMPUTATION FUNCTION (USING ARRAY-POINTER SLIDER METHOD) */
function compute_Dates(dateArray, totalUsers) {
  var count = 1;
  var result = "";

  for (var i = 0; i < dateArray.length; i = i + 1) {
    if (dateArray[i] === dateArray[i + 1]) {
      count = count + 1;
    }
    else {
      if (count === totalUsers) {
        result = result + ("[" + dateArray[i] + "] ");
      }
      count = 1;
    }
  }

  if (result === "") {
    window.alert("There is no common date where all of you are available. Please try to reach a compromise then try again.");
  }
  else {
    window.alert("There are dates that all of you can meet up: " + result.trim());
   }
}

/* DATE-COMPARATOR OBJECT (IN JAVASCRIPT) */
function datesort(date1, date2) {
  var a = new Date(date1);
  var b = new Date(date2);
  return a - b;
}

/* INPUT VALIDATION FUNCTION */
function validate(inputName) {
  var sample = inputName.toLowerCase();

  if (sample.length === 0) {
    window.alert("Input field is empty.");
    return false;
  }
  else if (sample.replace(/[a-zA-Z\s]/g,"").length > 0) {
    window.alert("Input name should only contain a-z or A-Z. Please enter name again.");
    return false;
  }
  else {
    for (var i = 0; i < keywords.length; i = i + 1) {
      if (sample.includes(keywords[i])) {
        window.alert("Input name contains illegal keywords. Please enter name again.");
        return false;
      }
    }
    return true;
  }
}

/* DATEPICKER CLOSING FUNCTION */
function closeDatePicker() {
  $('#dates').multiDatesPicker('hide');
}
/* ========== !PREDEFINED FUNCTIONS FOR MANUAL.HTML USER FORM USAGE ========== */