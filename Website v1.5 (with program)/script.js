// ====== script.js ====== //

var database = {
    numUsers: 0,
    date_string: ""
  };

//var start_compute = false;

$(document).ready(function() {

	$( ".accordion" ).accordion({ collapsible: true, active: false });

  $( "#help" ).dialog({
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

  $( "#help-trigger" ).click(function() {
    $( "#help" ).dialog( "open" );
  });

	//============ FORM ============//
  var dialog, form,
 
  name = $( "#name" ),
  dates = $( "#dates" ).multiDatesPicker({
            dateFormat: "yy-mm-dd"
  });
  allFields = $( [] ).add( name ).add( dates );

  function isNameFilled( o ) {
    if ( o.val().length === 0 ) {
      window.alert("Name not filled.");
      return false;
    } else {
      return true;
    }
  }

  function isDateFilled( o ) {
    if ( o.val().length === 0 ) {
      var proceed = window.confirm("Date field is empty. Proceed?");
      return proceed;
    } else {
      return true;
    }
  }
 
  function addUser() {
 	  var valid = isNameFilled( name ) &&
 	  			  		isDateFilled( dates );
 
    if ( valid ) {
      if (database.date_string === "") {
        database.date_string += dates.val();
      }
      else {
        database.date_string += (", " + dates.val());
      }

      database.numUsers += 1;

      $( "#users tbody" ).append( "<tr id=" + "entry" + ">" +
        "<td id=" + "entry" + ">" + name.val() + "</td>" +
        "<td id=" + "entry" + ">" + dates.val() + "</td>" +
      "</tr>" );
      dialog.dialog( "close" );
    }      
    return valid;
  }
 
  dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      "Add a member": addUser,
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {
      $( "#dates" ).multiDatesPicker( "resetDates", "picked" );
      form[ 0 ].reset();
    }
  });
 
  form = dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    addUser();
  });
 
  $( "#create-user" ).button().on( "click", function() {
    dialog.dialog( "open" );
  });

  $( "#reset-table" ).button().on( "click", function() {
    $( "tr#entry, td#entry" ).remove();
    database.numUsers = 0;
    database.date_string = "";
  });

  $( "#compute" ).button().on( "click", function() {
    database.date_string += ", ";
    var test = (database.date_string.split(", ").sort(datesort));
    compute_Dates(test, database.numUsers);
  });

  //============ !FORM ============//
})

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

function datesort(date1, date2) {
  var a = new Date(date1);
  var b = new Date(date2);
  return a - b;
}
