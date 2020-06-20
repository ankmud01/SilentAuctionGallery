# SilentAuctionGallery
![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=plastic)
        <img src="https://img.shields.io/badge/license-MIT-green?style=plastic" alt="License Badge">  [![GitHub pull-requests closed](https://img.shields.io/github/issues-pr-closed/Naereen/StrapDown.js.svg?style=plastic)](https://GitHub.com/Naereen/StrapDown.js/pull/) [![GitHub stars](https://img.shields.io/github/stars/Naereen/StrapDown.js.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/Naereen/StrapDown.js/stargazers/)

# Project-Title: 
SilentAuctionGallery

## Author: 
Ankit Mudvari, Dean Warren, Isaiah Kelly, Joshua Stillion, Steven Langlois

## Table of Contents
=====================
* [Installation](#installation)
* [License](#license)
* [Usage](#usage)
* [Contributors](#contributors)
* [Test](#test)
* [Contributing](#contributing)
* [Questions](#questions)

## Installation
To install necessary dependencies, run the following command:<br>
```
npm install
```
Create a `.env` file for all system variables:
```
# .env for SilentAuctionGallery
# Node Environment
NODE_ENV=development
PORT=3000

# MySQL DB Credentials
DB_USER=root
DB_PASSWORD=root
DB_NAME=silentauctiondb
DB_HOST=localhost

# SESSION SECRET
SESSION_SECRET='your secret phrase'

# GMAIL Account credentials
GMAIL_SERVICE_HOST=smtp.gmail.com
GMAIL_PASSWORD='your gmail password here'
GMAIL_USERNAME='gmail-account@gmail.com'
GMAIL_SERVICE_SECURE=false
GMAIL_SERVICE_PORT=587

# Twilio Account Credentials
TWILIO_ACC_SID='your Twilio SID here'
TWILIO_AUTH_TOKEN=your Twilio Auth_Token here'
TWILIO_PHONE_NUM='Twilio Phone Number'
```

## License
MIT

## Usage
I am a highschool art teacher whose students were unable to have a silent auction to display and sell their work due to COVID-19. I want to be able to display my students' work in a professional manner. Each artist will have a Bio page and thumbnails of their art that can be enlarged on click. 

## Collaborators
[deawar](https://api.github.com/users/deawar/repos), shbibby, [isaiahpkelly](https://api.github.com/users/isaiahkelly/repos), grahamgolf

## Test
To run test, run the following comand:<br>
```
npm run lint
```
To run the application locally, run the following command:<br>
```
npm run start_local
```
Or :<br>
```
node -r dotenv/config server.js 
```
Or if you prefer `nodemon` :<br>
```
 nodemon -r dotenv/config server.js
```

## Contributing
This application will be used for helping teachers and students to raise charity for a good cause and showcase their talent. So, please be respectful and mindful to others

<br>
<img src="https://prezi.com/view/laFRI0MbylYOWSvRisPr/" alt="Demo">

## Questions

<img src="https://avatars0.githubusercontent.com/u/59261007?v=4" alt="ME" width="150" height="150"><br>
if you have any questions about the repo contact me or deawar directly at ankmud01@gmail.com or deawar@gmail.com thank you.<br>
If you want to see more of my work please click here https://api.github.com/users/ankmud01/repos.

