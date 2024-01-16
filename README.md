![HTML CSS](https://img.shields.io/badge/HTML-CSS-blue) ![JavaScript JQuery](https://img.shields.io/badge/Javascript-JQuery-orange) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-green) ![Daisy UI](https://img.shields.io/badge/Daisy-UI-green) ![Server-Side APIs](https://img.shields.io/badge/Server-SideAPIs-black) ![RAWG APIs](https://img.shields.io/badge/RAWG-APIs-black) ![GameSpot APIs](https://img.shields.io/badge/GameSpot-APIs-black) 

<h1 align="center">The University of Gaming</h1>

Imagine brainstorming game ideas, only to get swamped by irrelevant comics and TV shows in your Google search. Frustrating, right? The University of Gaming cuts through the clutter. Say goodbye to endless clicking and hello to a curated portal to the world of video games. Think two massive gaming databases, *RawG* and *Gamespot*, beautifully condensed and presented in sleek, bite-sized cards. No more information overload! Find release dates, platforms, and screenshots at your fingertips. Dive deeper with "Find Out More" for detailed descriptions, developer insights, and ratings. All this, alongside a fresh feed of gaming news, keeps you informed and entertained without leaving the app.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage](#Usage)
- [Instruction](#instruction)
- [Overview](#overview)
- [Screenshots](#screenshots)
- [APIs Used](#apis-used)
- [Technologies Used](#technologies-used)
- [Contribution/Roles](#contributionroles)
- [Installation Instruction](#installation-instruction)
- [License](#license)

## User Story
```md
As a junior software developer I have different ideas of new games. 
Also, as A dedicated gamer, My mind is constantly immersed in thoughts of video games.
Whether pondering a new concept or exploring existing titles,
I actively seek information to satisfy my curiosity. 
I eagerly pursue new weekly game articles, 
ensuring I stay informed about latest gaming news.
```

## Acceptance Criteria
```md
Scenario: Exploring Game Title
GIVEN: I am on the homepage of The University of Gaming
	WHEN: I search for the game in the search bar
THEN: The page will guide me through the process of recognising and selecting the game title I am looking for.

Scenario: Viewing Detailed Game Profiles
GIVEN: I have found a game title and clicked on it
	WHEN: I am directed to the detailed game profile page
THEN: The page should display comprehensive information, including title, released date, platforms, developers, publishers, tags, rating, genres, images and a video of the game.  

Scenario: Navigating Recently Searched Games
GIVEN: I am on the homepage of the University of Gaming
	WHEN: I click on recently searched games
THEN: I am presented with the 13 most recent game searches
	WHEN: I click on a game under the most recent game search
THEN: The page guides me through the process of recognising and selecting the game title.

Scenario: Viewing Weekly Video Game Articles
GIVEN: I am on the homepage of the University of Gaming
	WHEN: I click on a list of links under the Weekly Video Game Articles
THEN: I am presented with the news articles in a third party website.
```

## Usage

| Steps                | Details                                                                  |
| -------------------- | ------------------------------------------------------------------------ |
| Live application |  [The University of Gaming](https://yukitoshi12345.github.io/The-University-of-Gaming/)                                                           |
| Clone this repo      | ` git clone git@github.com:Yukitoshi12345/The-University-of-Gaming.git` |
| run on vs | ` cd .. `                                                           |

## Instruction
*The University of Gaming* is a 3 pages app where initially an user can search for a game by typing in keyword/s. The search returns a list of related games in the second page in nicely designed cards with a small picture and title, released date and platforms on it. It displays 6 results/games per page. The user can navigate through these search results by pressing *❮❮Previous Page* and *Next Page❯❯* buttons. The user can also view enlarged picture of a game by clicking on the image on the card. Pressing *Find out More* button on any of the cards will take the user to the third page. This is where the user can see the detailed information about the selected game. The information such as title, description, developers, publishers, platforms, tags, genres, rating and released dates.

## Overview

#### Features:
- Game Search
- Recent Gaming New Articles
- Game Details
- Video
- Picture Slideshow


#### Motivation For Development:
As a passionate gamer, this has given us the incentive to address an issue we face. 


#### Challenges:
- Divergent initial approaches complicated project scope and vision.
- The merge conflict in Git Collaboration caused initial confusion
- Learning Tailwind CSS and Daisy UI.
- Encountered hurdles with Amazon's documentation which was our original second API, forcing us to explore alternative options. 
- JQuery, Tailwind CSS, Daisy UI issue linking pages brought its own challenges
- Inconsistent code layout and a lack of code commenting initially hampered collaboration.


#### Successes:
- Project transcended technical skills, becoming a journey of personal and professional development through virtual collaboration.
- Online collaboration fostered community and enjoyment, transforming strangers into friends and productive teammates.
- Learning New Framework: Tailwind CSS and Daisy UI.
- Designing Responsive Web Applications for Optimal User Experience and Enjoyment.

## Screenshots
Page 1 - Index Page:             
![image](assets/screenshots/index.png)

Page 1 - Index Page on medium screen:
![image](assets/screenshots/index-md.png)     

Page 1 - Index Page on small screen:          
![image](assets/screenshots/index-sm.png)      

Recently Searched Games:                 
![image](assets/screenshots/ls.png)

10 Most Recent Gaming New Articles:               
![image](assets/screenshots/articles.png)

Page 2 - Games Page (Search Results):          
![image](assets/screenshots/games.png)

Page 3 - Game Details Page:        
![image](assets/screenshots/details.png)


## APIs Used
- [RAWG Game Database API](https://rawg.io/apidocs)  
```md   
URL: https://api.rawg.io/api/games?key={YOUR-API-KEY}
URL: https://api.rawg.io/api/games/id?key={YOUR-API-KEY}
URL: https://rawg.io/api/games/${slug}/screenshots?key={YOUR-API-KEY}
```          

- [Gamespot Game Database API](https://www.gamespot.com/api/) 
```md          
URL: https://www.gamespot.com/api/articles/?api_key={YOUR-API-KEY}
URL: https://www.gamespot.com/api/videos/?api_key={YOUR-API-KEY}
```             

## Technologies Used
- HTML
- CSS
- CSS Framework
	- [Tailwind CSS](https://tailwindcss.com/)
- CSS Component Library
	- [DaisyUI](https://daisyui.com/)
- Javascript
- Javascript Library
	- [jQuery](https://jquery.com/)
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)
- Local Storage


## Contribution/Roles

| Contributors                                                  | Roles                        | Task
| --------------------                                          | -------------------------    |---------------------------------------------  	|
| [Yukitoshi Imaizumi-Zhou](https://github.com/yukitoshi12345)  | Project Manager/Developer	   | Create and Maintain Github Repo<br>Assign Tasks and Manage Progress<br>Developed Game Details Feature|
| [Darren Doan](https://github.com/darrendoan)                  | Developer                    | Developed Game Search Feature |
| [Muhamad Sahid](https://github.com/BrxwnSugxr)                | Developer     			   | Developed Gaming News Article Feature<br> Prepare Presentation Slideshow  |
| [Suyash Maharjan](https://github.com/SimpleSuyash)            | UI Designer/Technical Lead   |  Lead Coding Team <br> Develop User Interface <br> Developed Game Video and Screenshots Slideshow Feature|

*The roles mentioned above are rough representation of individual member's tasks. Thoroughout the project, we all collaborated and contributed to each other's coding.*

## Installation Instruction      
- [Install nodejs and npm](https://nodejs.org/en/download)    
Node.js is for npm only. The project doesn't use the Node.js in any other way. It is a requirement to use Tailwind css.
- [Install Tailwind CSS](https://tailwindcss.com/docs/installation)   
Follow the instructions under Tailwind CLI
- CORS: Access-Control-Allow-Origin. This extension is needed to be installed and turned on for the weekly game articles and game video. Please follow the instruction below for more information.    
[https://chromewebstore.google.com/detail/lhobafahddgcelffkeicbaginigeejlf](https://chromewebstore.google.com/detail/lhobafahddgcelffkeicbaginigeejlf)


## Licence
This project is licensed under the [MIT License](https://github.com/Yukitoshi12345/The-University-of-Gaming/blob/main/LICENSE).
