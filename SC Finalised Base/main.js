// ====== main.js ====== //

/* READY FUNCTIONS */
$(document).ready(function() {
  // ACCORDION EFFECT FOR USEFUL LINKS
	$(".accordion").accordion({collapsible: true, active: false});

  /* ========== HELP DIALOG SCRIPTING ========== */
  $("#help").dialog({
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

  $("#help-trigger").click(function() {
    $("#help").dialog("open");
  });
  /* ========== !HELP DIALOG SCRIPTING ========== */
})