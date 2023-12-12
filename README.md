# Iot Device Management Platform

The Device Management Platform is designed to manage Iot deviodces. This platform enables users to sign up and verify their identity through the use of JSON Web Token (JWT) authentication, also there is different  ui section for the user of different roles (Operator, Engineer, Owner, Manager). The tech stack has been used to design this are Python , Django Rest Framework and React

## Table of Contents
- [IoT Device Management Platform](#iot-device-management-platform)
- [Key Features](#key-features)
- [Installation](#installation)

## Key Features
1. **User Authentication:** Employ JWT authentication to ensure secure user registration and authentication processes.
2. **Role Based Access Control:** Implemented a flexible role based access control system with roles such as Operator, Engineer, Manager, and Owner, on both UI and Backend for  effectively regulating access and permissions across the platform.
    ```
    Operator : can add and update DeviceData 
    Enginner:  can add and update Device
    Manager and Owner: can perform all the CRUD operation 
    ```
3. **Multi Database Setup:**  User and Device table has been stored in Postgresql Database and DeviceData has been stored in Timescale Database for real time management
4. **API Design:** Well structured Restful APIs has been implemented using DRF Viewsets and Serializers , and Definite URL patterns for smooth and seamless interaction between different databases and user request and response 

5. **Swagger Documentation:** Employ Swagger to automatically generate interactive API documentation, highlighting the accessible endpoints and their functionalities.

## Installation
Follow these steps to set up and run the project on your system:

1. **Clone the Repository:**
   ```
   git clone <repository-url>
   cd <project-directory>

   ```

2. **Make .env file in your repository:**
    ```
    make .env in root directory and copy values from exampleenv

    ```

3. **To Run Project:**
    ```
    make start
    
    ```

4. **Frontend:**
     ```
     http://0.0.0.0:3000
     
     ```

5. **Backend:**
    ```
    http://0.0.0.0:8000/admin/
    
    ```
6. **Swagger:**
    ```
    http://0.0.0.0:8000/swagger/
    
    ```
7. **TestCase:**
    ```
    make test
    
    ```


