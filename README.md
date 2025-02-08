# Doctor Booking System API

## Overview

# Doctor Booking System API

## Overview
The Doctor Booking System API allows users to register, login, book appointments, and manage their profiles. This API is designed to facilitate the process of booking appointments with doctors based on their specialties and availability.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Appointment](#appointment)
  - [Doctor](#doctor)
- [Running the Project](#running-the-project)
- [License](#license)
- [Contact](#Contact)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Ntokozo31/doctor-booking-system.git

2. ## Navigate to the project directory
cd doctor-booking-system

3. ## Install the dependencies:
npm install

## Usage

start the server
npm start

## API Endpoints

## Auth

Register a new user
POST /api/auth/register
Parameters:

username (String): User's username.
email (String): User's email.
password (String): User's password.
Responses:

200 OK: Success message.
400 Bad Request: Error message.

Login a user
POST /api/auth/login
Parameters:

email (String): User's email.
password (String): User's password.
Responses:

200 OK: Success message.
400 Bad Request: Error message.

Logout a user
POST /api/auth/logout
Responses:

200 OK: Success message.
400 Bad Request: Error message.

Get user profile
GET /api/auth/profile
GET /api/auth/profile

Update user profile
PUT /api/auth/profile/update
Parameters:

username (String): User's username.
email (String): User's email.
Responses:

200 OK: Success message.
400 Bad Request: Error message.

Delete user profile
DELETE /api/auth/profile/delete
Responses:

200 OK: Success message.
400 Bad Request: Error message.

## Appointment

Create an appointment
POST /api/appointment/create
Parameters:

speciality (String): Doctor's speciality.
location (String): Appointment location.
days (String): Appointment days.
time (String): Appointment time.
Responses:

200 OK: Success message and appointment details.
400 Bad Request: Error message.

Get all appointments for the user
GET /api/appointment/all
Responses:

200 OK: List of appointments.
400 Bad Request: Error message.

Check available slots
POST /api/appointment/slots
Parameters:

speciality (String): Doctor's speciality.
location (String): Appointment location.
days (String): Appointment days.
time (String): Appointment time.
Responses:

200 OK: Success message and available slots details.
400 Bad Request: Error message.

## Doctors

Get all doctors
GET /api/doctor/all/docs
Responses:

200 OK: List of doctors.
400 Bad Request: Error message.

Get doctors by location
GET /api/doctor/doc/:location
Parameters:

location (String): Doctor's location.
Responses:

200 OK: List of doctors in the specified location.
400 Bad Request: Error message.

## Running the project

to run the project, use the following commands:
npm install
npm start

## License

This project is licensed under the MIT license - see the license file for details
The MIT license was choosen because it is a permissive license that allows for broad use and distribution of software.

## Contact
I'm always open to discussing new ideas and collaborations.
Feel free to get in touch!

You can contact me via:
* Email: dubentokozo45@yahoo.com