# Schedule Comparator
Team Rocket's project for Orbital (Gemini)

# 29/06/2015
Changes/Notes:
* Base version of Schedule Comparator has been totally revamped. All changes should be committed towards the new version.

Required commits:
* sessions.php requires functionality of directing users joining a session to the correct URL + comparison page. A table of session IDs and the corresponding comparison option can be stored in the database to facilitate this.
* manual.php has 2 features incomplete (all to be in PHP):
  1. Allowing users to modify their own schedule entry
  2. Executing common date computation
* upload.php work depends on whether NUSMods APIcan be used to retrieve dates and times in a user's timetable.
* MultiDatesPicker interface to be changed to DatePair interface to also account for time selections.

----

# 02/06/2015
Changes/Notes:
* Starts from version 1.5 (previous versions 1.1 ~ 1.4 were uploaded to Google Drive instead for initial version control instead)
* Future works begin from this version onwards
* Current aim: to implement session system with SQL + PHP
* Next aims, in order: Settling input validation and exception handling, settling display, using Meteor.js
