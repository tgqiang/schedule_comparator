/*Change the date to start from today*/


// ====== manual.js ====== //

/* TEMPORARILY FOR MANUAL.HTML */
var database = {
    numUsers: 0,
    date_string: ""
  };

/* READY FUNCTIONS */
$(document).ready(function() {
  // ACCORDION EFFECT FOR USEFUL LINKS
	$(".accordion").accordion({collapsible: true, active: false});
	$(".titles").hover(
		function(){
			$(this).addClass('highlight');
		},
		function(){
			$(this).removeClass('highlight');
		}
	);
  
	/* ========== MANUAL.HTML USER FORM SCRIPTING ========== */
  var dialog, form,
 
  name = $("#name"),

  /*EDITED*/
  dates = $('#dates').multiDatesPicker({
	dateFormat: "yy-mm-dd",
	minDate: 0,
  });
  /*EDITED*/
  
  /*allFields = $([]).add(name).add(dates);*/

  /*This will check if name is filled or not*/
  function name_Fill_Validate(inputName) {
    if (inputName.val().length === 0) {
      window.alert("Name not filled.");
      return false;
    } else {
      return validate(inputName.val());
    }
  }
  /*This will check if date is filled or not*/
  function isDateFilled(inputDate) {
    if (inputDate.val().length === 0) {
      var proceed = window.confirm("Date field is empty. Proceed?");
      return proceed;
    } else {
      return true;
    }
  }
 
  function addUser() {
 	 var valid = name_Fill_Validate(name) &&
 	  			  		isDateFilled(dates);					
						
	/*THIS IS TO ENSURE THE DATE AND THE NAME IS FILLED*/
    if (valid) {
      if (database.date_string === "") {
        database.date_string += dates.val();
      }
      else {
        database.date_string += (", " + dates.val());
      }

      database.numUsers += 1;

      $("#users tbody").append("<tr id=" + "entry" + ">" +
        "<td id=" + "entry" + ">" + name.val() + "</td>" +
        "<td id=" + "entry" + ">" + dates.val() + "</td>" +
      "</tr>" );
      dialog.dialog("close");
    }      
    return valid;
  }
 
  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      "Add a member": addUser,
      Cancel: function() {
        dialog.dialog("close");
      }
    },
    close: function() {
      $("#dates").multiDatesPicker("resetDates", "picked");
      form[0].reset();
    }
  });
 
  form = dialog.find("form").on("submit", function(event) {
    event.preventDefault();
    addUser();
  });
 
  $("#create-user").button().on("click", function() {
    dialog.dialog("open");
  });

  $("#reset-table").button().on("click", function() {
    $("tr#entry, td#entry").remove();
    database.numUsers = 0;
    database.date_string = "";
  });

  $("#compute").button().on("click", function() {
    database.date_string += ", ";
    var test = (database.date_string.split(", ").sort(datesort));
    compute_Dates(test, database.numUsers);
  });
  /* ========== !MANUAL.HTML USER FORM SCRIPTING ========== */
})

/* ========== VALIDATION AND COMPUTATION FUNCTIONS FOR MANUAL.HTML USER FORM ========== */
// the function to compute the dates that every single person in the group is free
function compute_Dates(dateArray, totalUsers) {
  var count = 1;
  var result = "";

  for (var i = 0; i < dateArray.length - 1; i = i + 1) {
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

// the Java equivalent of the Comparator object
function datesort(date1, date2) {
  var a = new Date(date1);
  var b = new Date(date2);
  return a - b;
}

// the function to validate input data for manual form
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

function closeDatePicker() {
  $('#dates').multiDatesPicker('hide');
}

/* ========== !VALIDATION AND COMPUTATION FUNCTIONS FOR MANUAL.HTML USER FORM ========== */