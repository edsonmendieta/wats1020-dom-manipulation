//////////////////////////////////////////////////
// WATS1020 Dom Manipulation
// Custom script goes here.
//////////////////////////////////////////////////

$( document ).ready(function() {
    var userInfo = {
        firstName: 'Jane',
        lastName: 'Doe'
    };
    var voteCounts = {
        great: 0,
        greatest: 0,
        total: 0
    };
	
	if (("localStorage.voteCounts" in window) && ("localStorage.voteCounts" !== null)) 
		voteCounts = JSON.parse(localStorage.getItem("voteCounts")); // retrieves the saved record of voteCounts from the computer's local storage after user votes and displays the bar graphs accordingly.
	
	
	
	var updateBars = function(voteCounts){ 
		var greatBar = $(".great-progress");
		var greatestBar = $(".greatest-progress");
		var greatWidth = voteCounts.great / voteCounts.total; // width of greatBar
		var greatestWidth = voteCounts.greatest / voteCounts.total; //width of greatestBar
		greatBar.css("width", greatWidth * 100 + "%"); // displaying of bar: the width times 100 so that percentage is represented on a scale of 1 to 100 and not .01 to 1.0. git 
		greatestBar.css("width", greatestWidth * 100 + "%");
	};

	$(".login").on("click", function(){ // function executes when login button is clicked
		$(".navbar-form").fadeOut(1000); // form fields and "login" button are no longer displayed
		$(".user-info").fadeIn(2000); // "Welcome", user's name, and "logout" button are displayed
		$(".user-fullname").text(userInfo.firstName + " " + userInfo.lastName); // "first" and "last" are replaced with user's actual first and last name
		});
	
	$(".logout").on("click", function(){ // function executes when logout button is clicked
		$(".user-info").fadeOut(1000); // "Welcome", user's name, and "logout" button are no longer displayed
		$(".navbar-form").fadeIn(2000); // form fields and "login" button are displayed
	});
	


	
	$(".view-details").on("click", function(event){ // function executes when .view-details button is clicked 
		console.log(event);
		var targetElement = event.target;
		var container = targetElement.parentElement.parentElement;
		$(container).find(".details").each(function(index, el){ // parent of .view-details element and finding .details elements. This function executes for each .details element found.
			if ($(el).is(":visible")){ 
				$(el).slideUp(1000); // visibility made invisible
				targetElement.innerText = "View Details"; // button has this text now
				
				
			} else {
				$(el).slideDown(2000); // is made visible when initially not visible
				targetElement.innerText = "Hide Details"; // button has this text now
			}
		});
	});
	

	
	
	$(".vote").on("click", function(event){ // function executes when either voting button is clicked. 
		

		var button = $(event.target);
		if (button.data("vote") == "great"){ // identifies specific button by data attribute and does this if it's the "great" button.
			voteCounts.great += 1; // tally is recorded to "great" property of voteCounts object.
		} else if (button.data("vote") == "greatest"){ //identifies specific button by data attribue and does this if it's the "greatest" button. 
			voteCounts.greatest += 1;
		}
		voteCounts.total += 1; // tally is added to total number of votes 
		updateBars(voteCounts); // adjusts width of respective vote bar accordingly by percentage of total votes held by "great" and "greatest".
		setTimeout(function(){ // thanks voter a short time after voting
			$(".thanks").fadeIn(500);
		}, 1000);
		setTimeout(function(){ // thank you fades out after a short time after being present.
			$(".thanks").fadeOut(500);
		}, 2000);
		localStorage.setItem("voteCounts", JSON.stringify(voteCounts)); // sends vote to computer's local storage and keeps a record of the updated voteCounts object.
		});
	

	

	
	

});
