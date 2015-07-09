/* 
 * // HELP.JS FOR HELP.HTML //
 * CONTAINS THE SCRIPTING FOR THE HOME PAGE.
 */

/* READY FUNCTIONS */
$(document).ready(function() {  
  // ACCORDION EFFECT FOR USEFUL LINKS
	$(".accordion").accordion({
    collapsible: true,
    active: false
  });

  $("#show_create, #show_join, #show_manual, #show_upload").hide();

  /* ========== HELP DIALOG SCRIPTING ========== */
  
  $("#show_create").dialog({
    width: 500,
    height: 500,
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 500
    },
    hide: {
      effect: "blind",
      duration: 500
    }
  });

  $("#create").button().click(function() {
    $("#show_create").dialog("open");
  });
  
  $("#show_join").dialog({
    width: 500,
    height: 500,
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 500
    },
    hide: {
      effect: "blind",
      duration: 500
    }
  });

  $("#join").button().click(function() {
    $("#show_join").dialog("open");
  });

  $("#show_manual").dialog({
    width: 500,
    height: 500,
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 500
    },
    hide: {
      effect: "blind",
      duration: 500
    }
  });

  $("#manual").button().click(function() {
    $("#show_manual").dialog("open");
  });

  $("#show_upload").dialog({
    width: 500,
    height: 500,
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 500
    },
    hide: {
      effect: "blind",
      duration: 500
    }
  });

  $("#upload").button().click(function() {
    $("#show_upload").dialog("open");
  });

  /* ========== !HELP DIALOG SCRIPTING ========== */

})