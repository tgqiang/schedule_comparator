/* ====== sessions.js ====== */
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

/* READY FUNCTIONS */
$(document).ready(function() {
  /* ACCORDION EFFECT FOR USEFUL LINKS */
	$(".accordion").accordion({collapsible: true, active: false});

  /* ========== SESSION FORM SCRIPTING ========== */
  /* CREATE SESSION FORM */
  $("#session_create_form").dialog({
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
                $("#session_create_form").dialog("close");
                document.getElementById("session_create_form").reset();
              }
    }
  });

  /* OPENS DIALOG TO CREATE SESSION */
  $("#create_session_init").click(function() {
    $("#session_create_form").dialog("open");
  });

  /* CREATE SESSION SUBMISSION */
  $("#create_submit").click(function() {
    var validCreateSessionID = session_fields_validate($("#session_id_create").val());
    /* if session ID for creation is valid */
    if (validCreateSessionID) {
      $("#session_create_form").dialog("close");
    }
    /* otherwise, if session ID is invalid */
    else {
      event.preventDefault();
    }
  });

  /* JOIN SESSION FORM */
  $("#session_join_form").dialog({
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
                $("#session_join_form").dialog("close");
                document.getElementById("session_join_form").reset();
              }
    }
  });

  /* OPENS DIALOG TO JOIN SESSION */
  $("#join_session_init").click(function() {
    $("#session_join_form").dialog("open");
  });  

  /* JOIN SESSION SUBMISSION */
  $("#join_submit").click(function() {
    var validJoinSessionID = session_fields_validate($("#session_id_join").val());
    /* if session ID for creation is valid */
    if (validJoinSessionID) {
      $("#session_join_form").dialog("close");
    }
    /* otherwise, if session ID is invalid */
    else {
      event.preventDefault();
    }
  });
})

/* the function to validate input data for session forms */
function session_fields_validate(inputName) {
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

/* ========== !SESSION FORM SCRIPTING ========== */

/* ========== RANDOM ID GENERATING FUNCTIONS FOR SESSION ID ========== */
function generated_ID_validate(str) {
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

  var sample = str.toLowerCase();

  if (sample.length === 0) {
    return false;
  }
  else if (sample.replace(/[0-9a-zA-Z\s]/g,"").length > 0) {
    return false;
  }
  else {
    for (var i = 0; i < keywords.length; i++) {
      if (sample.includes(keywords[i])) {
        return false;
      }
    }
    return true;
  }
}

// 48 + n, n = [0,9] U [49,74]
function randomChar() {
    var n;
    var option = Math.round(Math.random() * 1);
    // generate random number
    if (option === 0) {
        n = Math.round(Math.random() * 9);
    }
    // generate random lowercase letter
    else {
        n = Math.round(49 + Math.random() * 25);
    }
    return String.fromCharCode(48 + n);
}

function generateID() {
    var id = '';
    for (var i = 0; i < 20; i++) {
        id += randomChar();
    }
    if (!generated_ID_validate(id)) {
        id = generateID();
    }
    else {
        event.preventDefault();
        document.getElementById("session_id_create").value = id;
    }
}

/* ========== !RANDOM ID GENERATING FUNCTIONS FOR SESSION ID ========== */