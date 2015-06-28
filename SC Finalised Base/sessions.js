// ====== sessions.js ====== //

/* READY FUNCTIONS */
$(document).ready(function() {
  // ACCORDION EFFECT FOR USEFUL LINKS
	$(".accordion").accordion({collapsible: true, active: false});

  /* ========== SESSION FORM SCRIPTING ========== */
  $("#session_form").dialog({
    width: 400,
    height: 450,
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 500
    },
    hide: {
      effect: "blind",
      duration: 500
    },
    buttons: {
      Cancel: function() {
                $("#session_form").dialog("close");
                document.getElementById("session_form").reset();
              }
    }
  });

  $("#session_init").click(function() {
    $("#session_form").dialog("open");
  });

  $("#create_submit, #join_submit").click(function() {
    var validSessionID = session_fields_validate($("#session_id").val());
    // if session ID is valid
    if (validSessionID) {
      $("#session_form").dialog("close");
      //document.getElementById("session_form").reset();
    }
    // otherwise, if session ID is invalid
    else {
      event.preventDefault();
    }
  });
})

  /* ========== !SESSION FORM SCRIPTING ========== */

// the function to validate input data for session forms
function session_fields_validate(inputName) {
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
  else if (sample.replace(/[0-9a-zA-Z\s]/g,"").length > 0) {
    window.alert("Session ID should only contain alphabets or numbers. Please enter desired session ID again.");
    return false;
  }
  else {
    for (var i = 0; i < keywords.length; i = i + 1) {
      if (sample.includes(keywords[i])) {
        window.alert("Session ID used contains illegal keywords. Please enter desired session ID again.");
        return false;
      }
    }
    return true;
  }
}

