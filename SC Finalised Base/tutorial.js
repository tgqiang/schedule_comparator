    // Define the tour!
    var tour = {
      id: "hello-hopscotch",
      steps: [
        {
		  title: "Welcome",
		  content: "We suggest you to visit our guide, or click 'Next' for a virtual tour",
		  target: "help",
		  placement: "bottom",
		  xOffset: 70
		},
        {
          title: "Helpful Links",
          content: "Click on 'NUS' or 'Tools' to access useful links that you might want to go to.",
          target: "links",
          placement: "bottom",
		  arrowOffset: "center",
		  xOffset: 100
        },
		{
          title: "Navigation",
          content: "Click Home to return to 'homepage' or click Sessions to create a new session",
          target: "home",
          placement: "bottom",
		  xOffset: 45
        },
		{
			title: "Now you're done!",
			content: "Click on \"Sessions\" to get started with your next step!",
			target: "sess",
			placement: "right",
			yOffset: -20
		}
      ],
	  showPrevButton: true,
	  nextOnTargetClick: true
    };
    if(localStorage.flagT < 1 && localStorage.flagT2 < 1){
                  hopscotch.startTour(tour);
    }