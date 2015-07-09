/* 
 * // IDGENERATOR (BACKUP).JS //
 * THIS IS A BACKUP COPY OF THE JAVASCRIPT FOR RANDOM ID GENERATION.
 * IT IS RECOMMENDED TO REMOVE THIS FILE ONCE THE PRODUCT HAS BEEN DEEMED TO BE
 * WORKING PERFECTLY FINE.
 */

function generated_ID_validate(str) {
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

  var sample = str.toLowerCase();

  if (sample.length === 0) {
    return false;
  }
  else if (sample.replace(/[0-9a-zA-Z\s]/g,"").length > 0) {
    return false;
  }
  else {
    for (var i = 0; i < keywords.length; i = i + 1) {
      if (sample.includes(keywords[i])) {
        return false;
      }
    }
    return true;
  }
}

// 48 + n, n = [0,9]^[17,42]^[49,74]
function randomChar() {
    var n;
    var option = Math.round(Math.random() * 2);
    // generate random number
    if (option === 0) {
        n = Math.round(Math.random() * 9);
    }
    // generate random lowercase letter
    else if (option === 1) {
        n = Math.round(17 + Math.random() * 25);
    }
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
        return id;
    }
}

generateID();

