#  Menos Web App

**Menos Web App** is a secure and scalable inventory management platform developed for **Menos Hardware Store** in Zimbabwe. This full-stack application emphasizes **cybersecurity**, **authentication**, and **real-time inventory control**, tailored to meet the needs of small to medium enterprises operating in a digital economy.

---

# Key Features

- 🔐 **User Authentication** using Passport.js and Bcrypt
- 📦 **Product Management**: Create, Read, Update, Delete (CRUD)
- 👥 **Role-Based Access Control** (Admin & Standard Users)
- 📊 **Real-Time Inventory Monitoring**
- 🔄 **Session Management** with Express-Session and Flash Messaging
- 🧭 **Category Filtering** and Dynamic UI Rendering
- 🔒 **Protected Routes** to ensure data integrity and access control

---

## 🧱 Tech Stack

| Layer         | Technology                     |
|---------------|--------------------------------|
| Frontend      | EJS, Bootstrap 5               |
| Backend       | Node.js, Express.js            |
| Database      | MongoDB, Mongoose              |
| Authentication| Passport.js (Local Strategy), Bcrypt |
| Sessions & Alerts | Express-Session, Connect-Flash |
| Logging       | Morgan                         |

---

## 🛠 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/menos-web-app.git
   cd menos-web-app
Install dependencies:

bash
Copy
Edit
npm install
Configure MongoDB: Ensure MongoDB is running locally, or use a hosted MongoDB Atlas URI in a .env file:

bash
Copy
Edit
MONGO_URI=mongodb://localhost:27017/menos
Run the application:

bash
Copy
Edit
node index.js
The app will be accessible at: http://localhost:2000

🗂 Project Structure
bash
Copy
Edit
menos-web-app/
├── models/           # Mongoose Models (User, Product)
├── views/            # EJS Templates (Pages & Layouts)
├── routes/           # App Routes
├── public/           # Static Assets (CSS, JS, Images)
├── functions/        # Custom Utility Functions (Error Handling)
├── index.js          # Main Server Entry Point
👤 Author
Takunda Muvandi
Cybersecurity Consultant & Full Stack Developer
