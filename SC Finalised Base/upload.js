// ====== upload.js ====== //

/* READY FUNCTIONS */
$(document).ready(function() {
  // ACCORDION EFFECT FOR USEFUL LINKS
	$(".accordion").accordion({collapsible: true, active: false});

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
})