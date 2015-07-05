// ====== upload.js ====== //
var xmlhttp = new XMLHttpRequest();

/* READY FUNCTIONS */
$(document).ready(function() {
  /* ================= PAGE READY HANDLER ================= */
  // ACCORDION EFFECT FOR USEFUL LINKS
	$(".accordion").accordion({collapsible: true, active: false});
  
  // TEST IF ENTRY-ADDED HANDLER
  if (window.sessionStorage.getItem("added") === "true") {
    $("#create-user").hide();
    $("#edit-self").show();
  }
  else {
    $("#edit-self").hide();
  }

  /* ================= PAGE READY HANDLER ================= */

	/* =============== 'X' BUTTON EXIT HANDLER =============== */
  // IF USER CLICKS 'X' BUTTON OF THE BROWSER
  window.addEventListener("beforeunload", function(event) {
    event.returnValue = "It is STRONGLY recommended that you leave this page by exiting the session via the button present in this page instead."; 
  });

  // IF USER CONFIRMS LEAVING PAGE VIA 'X' BUTTON OF THE BROWSER
  window.onunload = function() {
    xmlhttp.open('GET', 'windowClose.php', true);
    xmlhttp.send();
  };
  /* =============== !'X' BUTTON EXIT HANDLER =============== */

  /* ========== UPLOAD.HTML USER FORM SCRIPTING ========== */
  var dialog, form,
 
  name = $("#name"),
  address = $('#address');

  /* This will check if name is filled or not */
  function name_Fill_Validate(inputName) {
    if (inputName.val().length === 0) {
      window.alert("Name not filled.");
      return false;
    } else {
      return validate(inputName.val());
    }
  }
  
  /* This will check if address (URL) is filled or not */
  function url_Fill_Validate(urlstr) {
    // Test for URL in the form of 'http://modsn.us/*'
    var test1 = urlstr.substr(0, 16) === 'http://modsn.us/';

    // Test for URL in the form of 'http://nusmods.com/timetable/*'
    var test2 = urlstr.substr(0, 29) === 'http://nusmods.com/timetable/';

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

    if (urlstr.length === 0) {
      window.alert("URL input field is empty.");
      return false;
    }
    else if (!(test1 || test2)) {
      window.alert("Input URL does not come from NUSMods.");
      return false;
    }
    else {
      for (var i = 0; i < keywords.length; i = i + 1) {
        if (urlstr.includes(keywords[i])) {
          window.alert("Input URL contains illegal keywords.");
          return false;
        }
      }
      return true;
    }
  }
 
  function addUser() {
   /* THIS IS TO ENSURE THE ADDRESS AND THE NAME IS FILLED */
   var valid = name_Fill_Validate(name) &&
                url_Fill_Validate(address.val());
    
    if (valid) {
        $.get('addEntryURL.php', {person: name.val(), address: address.val(), added: true}, function() { window.alert("Successfully added.") });
        window.sessionStorage.setItem("added", "true");
        $("#create-user").hide();
        $("#edit-self").show();
        dialog.dialog("close");
    }
    else {
      event.preventDefault();
    }
  }

  function updateUser() {
   /* THIS IS TO ENSURE THE DATE AND THE NAME IS FILLED */
   var valid = name_Fill_Validate(name) &&
                url_Fill_Validate(address.val());
    
    if (valid) {
        $.get('updateEntryURL.php', {person: name.val(), address: address.val()}, function() { window.alert("Successfully updated.") });
        dialog.dialog("close");
    }
    else {
      event.preventDefault();
    } 
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

  /* ALL THESE FUNCTIONS CAN BE REUSED

  // HANDLER WHEN USER WANTS TO MODIFY SELF SCHEDULE ENTRY
  $("#edit-self").button().on("click", function() {
    $("#dialog-form").dialog("open");
  });


  // HANDLER FOR COMMON DATE COMPUTATION
  $("#compute").button().on("click", function() {
    $(document).load('computeDates.php', function(result) {
      var tablesize = parseInt(result.substring(result.length - 1));
      var arrayOfDates = result.substring(0, result.length - 1).split(", ").sort(datesort);
      compute_Dates(arrayOfDates, tablesize);
    });
  });
  */
  /* ========== !UPLOAD.HTML USER FORM SCRIPTING ========== */
})

/* ========== PREDEFINED FUNCTIONS FOR MANUAL.HTML USER FORM USAGE ========== */
/*
// COMPUTATION FUNCTION TO BE WRITTEN FOR NUSMODS OPTION, NOT THE ONE BELOW
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
*/
// INPUT VALIDATION
function validate(inputName) {
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
/* ========== !PREDEFINED FUNCTIONS FOR MANUAL.HTML USER FORM USAGE ========== */