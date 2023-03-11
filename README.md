https://ratemystudyspot.azurewebsites.net/
# Project Description

## Problem
Finding study spots on college campuses is difficult, especially at the University of Washington where there are over 500 buildings. Study spots are where you maximize your productivity, in an environment of people with similar goals. It can be challenging to ask others where their go-to study spots are, and there’s no list of valuable spots readily-available at your fingertips. As a result, college students have to go out and discover favorable study spots themselves, which can take a long time at big campuses such as UW Seattle.

## Solution
We aim to create a safe, collaborative forum where fellow students can discuss and share their best and favorite study spots in order to help each other make critical choices that enable them to maximize productivity. Authenticated users will be able to review and rate study spots that they find around campus. Users are also able to rate and review existing spots or upload new ones if they don’t already exist in the database. College students would want to use this solution to easily discover highly-recommended study spots from their fellow peers. Once finding a study spot, they can go there and try studying there themselves. This gives them the opportunity to leave ratings as well, which can inform others and provide everyone with a representative of students’ opinions of study spots.

As developers, we want to build this application out of our passion for the University of Washington - Seattle campus. We also want to provide fellow students the opportunity to discover the best parts of campus for studying, because we have experienced our own struggles with finding places to study.

# Technical Description

## Architectural Diagram
![Architectural Diagram](Architectural-Diagram.png)

## User Stories
| Priority | User | Description | Technical Implementation |
|:---------|:-----|:------------|:-------------------------|      
| P0       | As a UW Student, | I want to be able to rate study spots with a star rating. | Take user input (an int) and post it to **MongoDB**.
| P0       | As a UW Student, | I want to review study spots with text. (a user can only review a unique spot once) | Take user input and post it to **MongoDB**.
| P0       | As a UW Student, | I want to add a new study spot location to the website. | Take user input (location) and post it to **MongoDB**.
| P1       | As a UW Student, | I want to be able to login/logout/create an account | We will use **Microsoft** authentication.
| P2       | As a UW Student, | I want to edit or remove reviews | Use remove() from **MongoDB** with the query of user name in the location reviews.
| P2       | As a UW Student, | I want to sort study spots available | GET a list of existing study spots from **MongoDB**, then sort by user choice (alphabetical, rating, etc.)
| P3       | As a UW Student, | I want to save or bookmark study spots I see on the site so I can remember which ones I like. | Each user will have an object stored in **MongoDB** representing them. There will be an attribute called “bookmarks” which points to an array of study spots' IDs.

## End Points
| Endpoint | Notes |
|:---------|:------|
|/users/ (POST) | Create new user |
|/users/ (GET) | Get/update user info |
|/login/ (POST) | Start new session |
|/bookmark/ (POST) | Bookmark a study spot for a logged-in user |
|/logout/ (POST) | End session |
|/location/{id} (GET) | Gets location and all its reviews |
|/bookmark/ (GET) | Gets all the user's bookmarks |
|/rate/ (POST) | Rates an already-published study spot and updates its average rating |
|/create/ (POST) | Create a new study spot location |
|/review/ (POST) | Review a study spot location |

# Appendix
## Database Schemas
**StudySpot** =  new mongoose.Schema({
    name: String,
	address: String,
	image: String,
	reviewText: String,
	rating: Number,
	initialRating: Number,
	author: String,
	dateCreated: Date
})


**User** = new mongoose.Schema({
	name: String,
	Bookmarks: [String]
})

**Review** = new mongoose.Schema({
	name: String,
	author: String, 
	studyspot: { type: mongoose.Schema.Types.ObjectId, ref: "StudySpot" },
	reviewText: String,
	rating: Number,
	dateCreated: Date
})


