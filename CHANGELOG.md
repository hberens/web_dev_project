Change Log
All notable changes to this project will be documented in this file.

# v0.2.0 - 2025-03-04 </br>
## Added
- Created "Books" and "Comment" Classes for Parse modules
- Added routing between pages. These pages include the home page, list of books page, and the favorites page.
- Also added the ability for users to comment on the books listed on the page by entering their name and ssubmitting a text submission to show up on the book card. Added a delete button to each comment that will remove them after a refresh. 
- Additionaly, created a pointer between the "Comment" class and "Books" class to follow the "Rule of 10" and reveal a many-to-one relationship between the two classes. This allows for many comments to be associated with a single book. </br> </br>
## Changed 
- Changed the backend to be a back4app database rather than a JSON file.
- Switched the main focus of the project from an interactive Notre Dame football website to a popular book-sharing website. The new app resembles a social platform for avid book readers. 
- Began using Webpack and react-vite rather than codesandbox for more robust design. Additionally, used Github rather than codesandbox for version control.
- Changed CSS styling to better suite an earth-toned aesthetic rather than a Notre Dame theme. Added more resposive design surrounding the list of books. </br> </br>
## Fixed 
- Parse modules issues and incosistent updates between the backend and the frontend.

# v0.1.0 - 2025-02-18 </br>
## Added
- Created a JSON file consisting of ND football coaches and their statistics such as seasons, points, and win-loss streak.
- Created a JSON file consisting of Heisman Trophy Winners and included an interactive dropdown for the user to view the data of the selected Heisman winner.
- Utilized axios/http to handle data requests to the JSON files.
- Created more user input options with a form for them to submit the name of their favorite Notre Dame Quarteback.
- Added asynchronous data in components using promises and async/await functions. </br> </br>
## Changed
- Changed CSS styling to better match Notre Dame's aesthetic using gold, navy blue, and green.
- Components and folder structure so that we follow the "data down, events up" approach with Props and Events. </br> </br>
## Fixed
- Issues with loading the JSON data to the frontend by improving fetch functions and properly sending props between components. </br>

