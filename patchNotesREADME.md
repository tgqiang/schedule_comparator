# Schedule Comparator
Team Rocket's project for Orbital (Gemini)

# 09/07/2015
Changes/Notes:
* Upload implementations are fully complete
* Patch to sessions.php to prevent redirection upon attempting to join non-existent session
* Help dialog detached from homepage as a stand-alone help page

Required commits:
* Rigourous testing needed for application. (_Potential issue, no commit needed if this issue is confirmed as absent_) Need to also verify whether table is dropped when members who joined session leaves it (**serious issue, affects base functionality of manual comparison method**)
* Proceed to migrate to Datepair interface when testing is completed.

----

# 01/07/2015
Changes/Notes:
* Session and Manual implementations are complete
* Current direction would be to work on timetable URL upload implementations
* When 2nd point is complete, proceed to migrate to Datepair interface
 
Required commits:
* (_Potential issue, no commit needed if this issue is confirmed as absent_) Need to verify whether table is dropped when members who joined session leaves it (**serious issue, affects base functionality of manual comparison method**)
* upload.php work depends on whether NUSMods APIcan be used to retrieve dates and times in a user's timetable.
* MultiDatesPicker interface to be changed to DatePair interface to also account for time selections.

----

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
