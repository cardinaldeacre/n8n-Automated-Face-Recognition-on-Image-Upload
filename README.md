# 🎓 Automated Face Recognition Campus Permission System

An integrated **campus boarding school permission and access monitoring system** that combines web-based permission management with automated face recognition.

The system enables students to submit campus exit permissions while automatically monitoring entry and exit activity through face recognition. Recognition results are integrated with the permission system to determine access status and record attendance or violations.

---

## ✨ Overview

This project combines **web development, automation, and artificial intelligence** into a single integrated system.

When a face is detected, the Face Recognition service identifies the person and sends the recognition result to the backend. The backend then validates the student's permission status, records the activity, and triggers the appropriate workflow.

The entire application is designed as a modular system, allowing each service to run independently while communicating through APIs and automated workflows.

---

## 🚀 Key Features

- 🔐 **Authentication & Role-Based Access**
- 📝 **Campus Permission Management**
- 🤖 **Automated Face Recognition**
- 🚪 **Entry & Exit Monitoring**
- ⚠️ **Automatic Violation Tracking**
- 📋 **Attendance & Activity Logs**
- ⚙️ **Automated Workflow Integration**
- 📖 **Interactive API Documentation**
- 🐳 **Containerized Deployment**

---

## 🧠 How It Works

```text
            ┌──────────────────┐
            │      React       │
            │     Frontend     │
            └────────┬─────────┘
                     │
                     ▼
            ┌──────────────────┐
            │    Express.js    │
            │     Backend      │
            └────────┬─────────┘
                     │
              ┌──────┴──────┐
              ▼             ▼
       ┌────────────┐  ┌─────────────┐
       │ PostgreSQL │  │     n8n     │
       │  Database  │  │  Workflow   │
       └────────────┘  └──────┬──────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ Face Recognition│
                     │ Python / FaceNet│
                     └─────────────────┘
```

The general workflow consists of:

1. Students submit permission requests through the web application.
2. Permission information is stored and managed by the backend.
3. The face recognition service detects and identifies registered users.
4. Recognition results are processed and connected to the permission workflow.
5. The system determines whether the user has valid permission.
6. Entry, exit, attendance, and violation activities are automatically recorded.

---

## 🛠️ Tech Stack

### Frontend

- **React**
- JavaScript
- Web-based dashboard & user interface

### Backend

- **Node.js**
- **Express.js**
- **PostgreSQL**
- Knex.js
- JWT Authentication
- Swagger API Documentation

### Face Recognition

- **Python 3.7**
- **Keras FaceNet**
- Face Embedding & Recognition Pipeline

### Automation

- **n8n**
- Automated recognition and permission workflows

### Infrastructure

- **Docker**
- Docker Compose
- Containerized multi-service architecture

---

## 📁 Project Structure

```text
.
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── migrations/
│   ├── seeds/
│   ├── services/
│   └── server.js
│
├── frontend/
│   └── React web application
│
├── face-rec/
│   ├── data/
│   ├── encodings/
│   ├── utils.py
│   ├── encoding.py
│   ├── prepare_data.py
│   └── face_recognition.py
│
├── n8n/
│   └── n8n workflow configuration
│
├── docker/
│   └── Docker configuration
│
└── README.md
```

Each module contains its own configuration and documentation where applicable.

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/cardinaldeacre/n8n-Automated-Face-Recognition-on-Image-Upload.git
cd n8n-Automated-Face-Recognition-on-Image-Upload
```

### 2. Configure Environment

Configure the required environment variables for each service, including:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

JWT_SECRET=
JWT_REFRESH_SECRET=
```

Refer to the individual service directories for additional configuration.

### 3. Prepare Face Recognition

The face recognition module requires **Python 3.7**.

```bash
cd face-rec

python3.7 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
```

Prepare the required FaceNet model, dataset, and face encodings before running the recognition service.

### 4. Run the Application

The project can be run using its individual services or through the provided Docker configuration.

Refer to the documentation inside each module for service-specific setup instructions.

---

## 🔐 Authentication & Access Control

The backend uses **JWT-based authentication** with Access and Refresh Tokens.

The system separates users into different roles, including:

- **Admin** — manages users, permissions, monitoring, and system data.
- **Student** — submits and manages campus permission requests.

---

## 🤖 Face Recognition

The face recognition module uses **Keras FaceNet** to generate facial embeddings and compare detected faces against registered users.

The pipeline includes:

```text
Image Input
    ↓
Face Detection
    ↓
Preprocessing
    ↓
FaceNet Embedding
    ↓
Encoding Comparison
    ↓
Identity Prediction
    ↓
Permission Validation
```

Recognition results can then be consumed by other services through the application's automated workflow.

---

## ⚙️ Workflow Automation

**n8n** acts as the automation layer connecting recognition events with the application's services.

It can coordinate processes such as:

- Receiving recognition events
- Forwarding recognition results
- Triggering permission validation
- Processing entry/exit events
- Connecting independent application services

This allows the AI, backend, and other services to remain modular while still operating as one integrated system.

---

## 🐳 Docker

The project includes Docker configuration to simplify running and connecting its services.

The containerized architecture helps maintain consistent environments between development and deployment while isolating individual application components.

---

## 📖 API Documentation

The backend provides interactive API documentation using **Swagger**.

After starting the backend, the documentation can be accessed at:

```text
http://localhost:3000/api-docs
```

---

## 🎯 Project Purpose

This project explores how **face recognition, workflow automation, and web technologies** can be integrated to automate campus permission monitoring.

Instead of relying entirely on manual verification, the system connects student permissions with real-time identity recognition to provide a more structured and automated entry/exit monitoring process.

---

## 👨‍💻 Contributors

Developed as a collaborative project combining:

- Full-Stack Web Development
- Backend Engineering
- Face Recognition
- Workflow Automation
- Containerized Infrastructure

---

## 📄 License

This project is intended for educational and development purposes.
