// ====== manual.js ====== //
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
  $(".accordion").accordion({collapsible: true, active: false});
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

  /* This will check if name is filled or not */
  function name_Fill_Validate(inputName) {
    if (inputName.val().length === 0) {
      window.alert("Name not filled.");
      return false;
    } else {
      return validate(inputName.val());
    }
  }
  /* This will check if date is filled or not */
  function isDateFilled(inputDate) {
    if (inputDate.val().length === 0) {
      var proceed = window.confirm("Date field is empty. Proceed?");
      return proceed;
    } else {
      return true;
    }
  }
 
  function addUser() {
 	 /* THIS IS TO ENSURE THE DATE AND THE NAME IS FILLED */
   var valid = name_Fill_Validate(name) &&
 	  			  		isDateFilled(dates);
    
    if (valid) {
        $.get('addEntry.php', {person: name.val(), dates: dates.val(), added: true}, function() { window.alert("Successfully added.") });
        window.sessionStorage.setItem("added", "true");
        $("#create-user").hide();
        $("#edit-self").show();
    }
    dialog.dialog("close");     
  }

  function updateUser() {
   /* THIS IS TO ENSURE THE DATE AND THE NAME IS FILLED */
   var valid = name_Fill_Validate(name) &&
                isDateFilled(dates);
    
    if (valid) {
        $.get('updateEntry.php', {person: name.val(), dates: dates.val()}, function() { window.alert("Successfully updated.") });
    }
    dialog.dialog("close");     
  }
  
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

  // FORM CONFIGURATIONS
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
  
  // FORM SUBMIT EVENT
  form = dialog.find("form").on("submit", function(event) {
    event.preventDefault();
  });
  
  // HANDLER WHEN USER INTENDS TO APPEND/MODIFY HIS/HER OWN ENTRY
  $("#create-user, #edit-self").button().on("click", function() {
    dialog.dialog("open");
  });

  // REFRESHES TABLE THAT IS DISPLAYED
  $("#reset-table").button().on("click", function() {
    $("tr#entry, td#entry").remove();
    $("#users tbody").load('refreshTable.php', function(result) {
      alert("Table refreshed.");
    });
  });

  /*
  // HANDLER WHEN USER WANTS TO MODIFY SELF SCHEDULE ENTRY
  $("#edit-self").button().on("click", function() {
    $("#dialog-form").dialog("open");
  });
  */
  
  // HANDLER FOR COMMON DATE COMPUTATION
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
// COMPUTATION FUNCTION
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

// DATE COMPARATOR OBJECT (IN JAVASCRIPT)
function datesort(date1, date2) {
  var a = new Date(date1);
  var b = new Date(date2);
  return a - b;
}

// INPUT VALIDATION
function validate(inputName) {
  /*
  var keywords = ["select",
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
                  */

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

// DATEPICKER CLOSING FUNCTION
function closeDatePicker() {
  $('#dates').multiDatesPicker('hide');
}
/* ========== !PREDEFINED FUNCTIONS FOR MANUAL.HTML USER FORM USAGE ========== */