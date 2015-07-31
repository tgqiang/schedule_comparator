	
	var tour2 = {
      id: "hello-hopscotch",
      steps: [
        {
		  title: "Initiating a meetup?",
		  content: "Click on create a session and start your session!",
		  target: "create_session_init",
		  placement: "right",
                  yOffset: -20,
                  zindex: 1,
                  nextOnTargetClick: true
        },
        {
                  title: "Start a new Session!",
                  content: "Click on generate ID to create a unique ID session and then choose either to manually input a session or timetable comparison.",
                  target: "generate",
                  placement: "right",
                  yOffset: -45,
                  xOffset: 250,
                  nextOnTargetClick: true
        },
        {
                  title: "Check your comparator choice and now create your own session!",
                  content: "Did you remember to choose manually input a session or timetable comparison? Now click on 'create session' to create your first session!",
                  target: "create_submit",
                  placement: "right",
		  arrowOffset: "right",
                  yOffset: -10,
                  nextOnTargetClick: true
        },
      ],
          showNextButton: false
    };
    
    // Start the tour!
    if(localStorage.flagT < 1 || localStorage.flagT2 < 1){
                  hopscotch.startTour(tour2);
    }