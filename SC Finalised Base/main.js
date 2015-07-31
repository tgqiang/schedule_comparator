/* 
 * // MAIN.JS FOR SCHEDULECOMPARATOR.HTML //
 * CONTAINS THE SCRIPTING FOR THE HOME PAGE.
 */

/* READY FUNCTIONS */
$(document).ready(function() {  
  // ACCORDION EFFECT FOR USEFUL LINKS
	$(".accordion").accordion({
    collapsible: true,
    active: false
  });
})

if(typeof(localStorage.$tart) === undefined) {
    localStorage.$tart = 0;
}

if(localStorage.$tart == 0) {
    localStorage.setItem("flagT", 0);
    localStorage.setItem("flagT2", 0);
    localStorage.$tart = 1;
}