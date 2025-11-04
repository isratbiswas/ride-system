# ride-system

---

## **🛠 Technologies Used**

- **Node.js** & **Express.js** – Backend server
- **MongoDB** & **Mongoose** – Database & schema modeling
- **JWT** – Authentication & role-based authorization
- **bcrypt** – Password hashing
- **Postman** – API testing

---

## **🔐 Features**

### **Authentication & Authorization**

- JWT-based login and registration
- Passwords are securely hashed using bcrypt
- Role-based access:
  - `admin`
  - `rider`
  - `driver`

### **Rider Features**

- Request a ride with pickup & destination
- Cancel ride (within allowed time window)
- View ride history

### **Driver Features**

- Accept/reject ride requests
- Update ride status: `accepted → picked_up → in_transit → completed`
- View earnings and ride history
- Set availability status: Online/Offline

### **Admin Features**

- View all users, drivers, and rides
- Approve/suspend drivers
- Block/unblock users
- Optional: Generate system reports

### **Ride Lifecycle**

- Ride statuses: `requested → accepted → picked_up → in_transit → completed → cancelled`
- Timestamps are logged for each status update
- Cancellation rules enforced based on role & status

---

## **📜 API Endpoints**

### **Auth**

| Method | Endpoint       | Description                              |
| ------ | -------------- | ---------------------------------------- |
| POST   | /auth/register | Register a new user (rider/driver/admin) |
| POST   | /auth/login    | Login and receive JWT token              |

### **Rides (Rider)**

| Method | Endpoint          | Description               |
| ------ | ----------------- | ------------------------- |
| POST   | /rides/request    | Request a new ride        |
| PATCH  | /rides/:id/cancel | Cancel a ride             |
| GET    | /rides/me         | View rider's ride history |

### **Rides (Driver)**

| Method | Endpoint          | Description                                         |
| ------ | ----------------- | --------------------------------------------------- |
| PATCH  | /rides/:id/accept | Accept a ride request                               |
| PATCH  | /rides/:id/status | Update ride status (picked_up/in_transit/completed) |
| GET    | /rides/me         | View driver's ride history & earnings               |

### **Admin**

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | /users               | View all users           |
| PATCH  | /drivers/approve/:id | Approve/suspend a driver |
| PATCH  | /users/block/:id     | Block/unblock a user     |
| GET    | /rides               | View all ride records    |

---

## **⚡ Business Rules**

- Drivers must be **approved and online** to accept rides
- Riders can only cancel before driver acceptance or within allowed window
- Only **one active ride per rider** at a time
- Drivers cannot accept multiple rides simultaneously
- Role-based route protection ensures security:
  - `riders` cannot access driver/admin routes
  - `drivers` cannot access rider/admin routes
  - `admins` have full access

---

## **🚀 Setup & Installation**

1. Clone the repository:

```bash
git clone https://github.com/your-username/ride-booking-api.git
```

## Install dependencies:

cd ride-booking-api
npm install

## Create a .env file and configure:

PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

## Start the server:

npm run dev
