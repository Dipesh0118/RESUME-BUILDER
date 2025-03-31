# AI-Based Resume Builder

## Introduction
Resumes are essential tools for job applications in today's professional world as they showcase an individual's abilities, experiences, and accomplishments. Creating a well-structured, visually appealing resume can be challenging, especially for individuals without design experience. The **AI-Based Resume Builder** simplifies this process by providing an intuitive platform for users to create, manage, and share professional resumes effortlessly. The system employs external authentication services, AI-generated summaries, and an easy-to-use interface to streamline the resume-building process while maintaining personalization and flexibility. This project integrates modern web technologies with **Gemini API** to deliver an efficient and user-friendly solution for resume preparation.

## Problem Statement
Creating a professional resume often requires significant effort, creative skills, and attention to detail. Manual resume creation is prone to formatting errors, lack of organization, and inconsistencies. Many users also struggle to summarize their professional experiences and personal profiles effectively. Existing solutions have limited adaptability or require technical knowledge, making them inaccessible to a broad audience. 

This project addresses these challenges by offering a seamless, intelligent, and user-centric resume-building tool that provides **guided resume creation with real-time previews and AI-assisted content generation**.

---

## Specific Requirements

### a. Functional Requirements

1. **User Authentication**:
   - Users must log in via the **Clerk API** to access their personalized dashboard.
   - Secure handling of user credentials.

2. **Resume Dashboard**:
   - Displays previously created resumes with options to **create, edit, and delete** resumes.

3. **Resume Creation**:
   - Provides forms for entering **personal details, professional experience, education, and skills**.
   - Uses **Gemini API** to generate AI-powered summaries for profiles and work experiences.

4. **Resume Preview and Actions**:
   - Displays a **real-time preview** of the resume as the user inputs details.
   - Allows users to **download the resume in multiple formats (e.g., PDF)** or share it via a unique link.

5. **Data Storage**:
   - Stores user data securely in a **MongoDB database** with proper organization for retrieval and updates.

### b. Non-Functional Requirements

1. **Performance**:
   - The website should load pages quickly and update the resume preview in real time.

2. **Reliability**:
   - Ensure the website is accessible with minimal downtime.

3. **Security**:
   - Encrypt sensitive user data to protect privacy.

4. **Usability**:
   - Design the interface to be simple and intuitive, even for non-technical users.

5. **Compatibility**:
   - Ensure the website works seamlessly on both desktop and mobile devices.

---

## System Specifications

### a. Hardware Specifications

#### 1. Server Requirements:
   - **Processor**: Dual-core processor or higher.
   - **RAM**: Minimum **4 GB**.
   - **Storage**: **50 GB of SSD storage**.
   - **Network**: Reliable internet connection for server communication.

#### 2. Client Requirements:
   - **Device**: Any desktop, laptop, or mobile device with internet access.
   - **Browser**: Modern web browsers such as **Chrome, Firefox, or Safari**.

### b. Software Specifications

#### 1. Frontend:
   - **Framework**: React.js for creating a responsive user interface.
   - **Languages**: HTML, CSS, and JavaScript.

#### 2. Backend:
   - **Framework**: Node.js with Express.js for server-side functionality.
   - **Authentication**: Clerk API for user login and security.

#### 3. Database:
   - **MongoDB** for storing user details and resumes.

#### 4. AI Integration:
   - **Gemini API** for generating AI-powered summaries for profiles.

---



## Installation Guide

Follow these steps to set up and run the project locally:

### **Prerequisites**
- Node.js and npm installed
- MongoDB set up locally or on a cloud service
- Clerk API key for authentication

### **Steps to Install & Run**

1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   CLERK_API_KEY=your_clerk_api_key
   ```

4. **Run the Backend**
   ```sh
   npm run server
   ```

5. **Run the Frontend**
   ```sh
   npm run client
   ```

6. **Access the Application**
   - Open `http://localhost:3000` in your browser.

---



## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this project.

---



