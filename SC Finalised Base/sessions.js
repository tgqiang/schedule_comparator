/* 
 * // SESSIONS.JS FOR SESSIONS.PHP //
 * CONTAINS ALL THE SCRIPTING FOR SESSIONS.PHP. ATTN: FURTHER TESTING IS REQUIRED
 * TO VERIFY INTEGRITY OF APPLICATION FUNCTIONALITY.
 */

/* SENSITIVE SQL KEYWORDS ARE DEFINED HERE
(TO AVOID DUPLICATE DEFINITION FOR VALIDATION FUNCTIONS) */
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
	$(".accordion").accordion({
    collapsible: true,
    active: false
  });

  /* ========== SESSION FORM SCRIPTING ========== */
  /* CREATE SESSION FORM CONFIGURATIONS */
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
    var method_selected = (document.getElementById('manual_option').checked) ||
                          (document.getElementById('url_option').checked);

    /* IF SESSION ID FOR CREATION IS VALID */
    if (validCreateSessionID && method_selected) {
      $("#session_create_form").dialog("close");
    }
    /* IF COMPARISON OPTION NOT SELECTED (ATTN: JUST IMPLEMENTED, REQUIRE TESTING)*/
    else if (validCreateSessionID && !method_selected) {
      event.preventDefault();
      window.alert("Comparison option is not selected, please choose one.");
    }
    /* OTHERWISE, IF SESSION ID IS INVALID */
    else {
      event.preventDefault();
    }
  });

  /* JOIN SESSION FORM CONFIGURATIONS */
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
    /* IF SESSION ID FOR CREATION IS VALID */
    if (validJoinSessionID) {
      $("#session_join_form").dialog("close");
    }
    /* OTHERWISE, IF SESSION ID IS INVALID */
    else {
      event.preventDefault();
    }
  });
})

/* THE FUNCTION TO VALIDATE INPUT DATA FOR SESSION FORMS */
function session_fields_validate(inputName) {
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