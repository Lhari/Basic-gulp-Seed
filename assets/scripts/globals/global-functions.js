// consoleLog
// ---------------------------

/* This function can be used to display console logs in complicated scripts without having 
to strip the console logs from the project once it hits production.

Usage:

consoleLog(log, group);


log - This is the log you wish to display. This can be anything you would reguarly put in a console.log().
group - Allows you to add the console log to a specific group of logs that will only display if the selected group is active.
debug - You set this variable to 'true' or 'false' based on if you want to show console logs or not.
showGroups - This controls which group of console logs you want to show. 

* You might have to comment out the console.log() once you hit production (at least it is only one)*
*/


function consoleLog(log, group) {
	var debug 		= true;
	var showGroups 	= ['default'];
    
	group = (typeof group === 'undefined') ? 'default' : group;

    if(debug == true && showGroups.indexOf(group, 0) != -1) {
      console.log(log);
    }
}


// Get GET vars from url
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// Replace all
function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}