
# GoDrive - Ride Sharing Platform

GoDrive is a real-time ride-sharing platform where users can request rides, and captains (drivers) can accept ride requests. The platform includes live location tracking and route tracking using Google Maps for a seamless ride experience.


![Home](https://res.cloudinary.com/dpfvh7e5x/image/upload/v1740076704/Screenshot_25_tupgyt.png)


## Features

- User Ride Request : Users can request a ride by entering their pickup and drop-off locations.
- Captain Ride Acceptance : Captains receive ride requests and can accept them.
- Real-Time Location Tracking : Uses Google Maps API for tracking the user's and captain's locations live.
- Ride Status Updates : Tracks ride progress (Pending, Accepted, In Progress.



## Built With

- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
- ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
- ![Google Maps API](https://img.shields.io/badge/Google_Maps_API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)
- ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
- ![Multer](https://img.shields.io/badge/Multer-FF0000?style=for-the-badge&logoColor=white)
## Getting Started

### Prerequisites

Ensure you have the following installed :

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Installation

#### Clone the repository :

```bash
 git clone https://github.com/PD203/GoDrive.git
 cd godrive
```

#### Install dependencies :

#### Server Setup 
```bash
 npm i axios bcrypt cloudinary cookie-parser cors dotenv express express-validator jsonwebtoken mongodb mongoose multer socket.io
```
#### Client Setup
```bash
 npm i @gsap/react @react-google-maps/api axios dotenv gsap react react-dom react-router-dom react-toastify remixicon socket.io-client
```

#### Set up environment variables in a .env file :

#### Server .env

```bash
PORT = 4000
DB_CONNECT = mongodb_connection_string
CLIENT_URL = http://localhost:5173
JWT_SECRET = jwt_secret
GOOGLE_MAPS_API = google_maps_api_key
CLOUDINARY_CLOUD_NAME = cloudinary_cloud_name
CLOUDINARY_API_KEY = cloudinary_api_key
CLOUDINARY_API_SECRET = cloudinary_api_secret
```
#### Client .env

```bash
VITE_BASE_URL = http://localhost:4000
SOCKET_BASE_URL = http://localhost:4000
VITE_GOOGLE_MAPS_API = google_maps_api_key
```

#### Start the Server :
```bash
 nodemon server.js 
```

#### Start the CLient :
```bash
 npm run dev 
```
## Usage

- Sign up as a User or Captain.
- Users can request a ride by selecting a pickup and drop-off location.
- Captains receive ride requests and can accept them.
- The ride progress is tracked in real-time using Google Maps.


## Contact

For any queries, feel free to reach out at https://www.linkedin.com/in/preeti-dalai-06303b273.
