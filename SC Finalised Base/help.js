/* 
 * // HELP.JS FOR HELP.HTML //
 * CONTAINS THE SCRIPTING FOR THE HELP PAGE.
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

  $("#show_manual").dialog({
    title: 'Using the manual comparison option',
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

  $("#manual").click(function() {
    $("#show_upload").dialog("close");
    $("#show_manual").dialog("open");
  });

  $("#show_upload").dialog({
    title: 'Using the timetable comparison option',
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

  $("#upload").click(function() {
    $("#show_manual").dialog("close");
    $("#show_upload").dialog("open");
  });

  /* ========== !HELP DIALOG SCRIPTING ========== */

})