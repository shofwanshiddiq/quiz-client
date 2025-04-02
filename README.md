![login](https://github.com/user-attachments/assets/0c44fda2-fb73-42e7-a548-63e8e508a15c)

# Harry Potter Quizzes Trivia Web Application Built Using ReactJS

This is a Web Application built using ReactJS, MaterialUI. Integrated with ASP.NET Core Web API and SQL Server Database. See the documentation for Quiz Backend API [here](https://github.com/shofwanshiddiq/QuizAPI)

### Features
* User registration & login
* Generate random 5 questions & answers from all questions available in the database
* Perform score calculation based on users choice and answers
* Calculate time taken by user for taking the test
* Submit score and save the result to database

## Technologies
![React.js](https://img.shields.io/badge/React.js-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)  ![Material-UI](https://img.shields.io/badge/Material--UI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)  ![Axios](https://img.shields.io/badge/Axios-%23000000.svg?style=for-the-badge&logo=axios&logoColor=white)  ![React Router](https://img.shields.io/badge/React_Router-%23CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white)  

## API Endpoints Documentation

| Method     | API Endpoint               | Description                                      |
|------------|----------------------------|--------------------------------------------------|
| **POST**   | `/api/Participant`            | Create a new participant                              |
| **GET**   | `/api/Participant`            | Get all participant data                              |
| **GET**   | `/api/Participant/{id}`            | Get participant data by ID                            |
| **PUT**   | `/api/Participant/{id}`            | Update participant data by ID                            |
| **DELETE**   | `/api/Participant/{id}`            | Delete participant data by ID                            |
| **POST**   | `/api/Question/GetAnswers`            | Get questions answer by question id                |
| **GET**   | `/api/Question`            | Get all questions                      |
| **GET**   | `/api/Question/{id}`            | Get question by ID                      |
| **PUT**   | `/api/Question/{id}`            | Update question data by ID                      |
| **DELETE**   | `/api/Question/{id}`            | Delete question data by ID                      |

# Getting Started

Follow these steps to set up the project:

### 1. Install Required Dependencies & Libraries
```bash
npm install ajv
npm install @mui/material
npm install @mui/icons-material
npm install axios
npm install react-router-dom
```

### 2. Make Sure Backend API is Running
* Make sure backend API is already running on port http://localhost:5272/
* Get the documentation for Quiz Backend API [here](https://github.com/shofwanshiddiq/QuizAPI)

### 3. Start the Project
```bash
npm start
```

# Gallery

<img src="https://github.com/user-attachments/assets/1acb953e-fce9-43b7-9efc-0cdb2083f14e" alt="Image 1" style="width: 400px;">
<img src="https://github.com/user-attachments/assets/8f45480d-fc0e-4329-9c0e-0ed565fc2ca1" alt="Image 2" style="width: 400px;">
<img src="https://github.com/user-attachments/assets/375a0802-13ab-4c63-a9b0-b697a6c6ddfb" alt="Image 3" style="width: 400px;">
