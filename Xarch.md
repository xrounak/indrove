## 🧭 User Flow: Step-by-Step


Client:
  1. Visits site → Sees homepage
  2. Signs up / logs in
  3. Posts a new task (title, desc, budget, deadline)
  4. Waits for applications from freelancers
  5. Views applicants → Assigns one
  6. (Optional) Makes payment via Razorpay
  7. Monitors progress via dashboard

Freelancer:
  1. Visits site → Sees homepage
  2. Signs up / logs in
  3. Browses open tasks
  4. Applies to interesting tasks
  5. If selected → Gets dashboard access to task
  6. Completes the task
  7. (Optional) Receives payment or reviews


---

## 🗂 Frontend Folder Structure (React + Firebase)


src/
├── assets/                  # Images, icons
│   ├── images/
│   └── icons/
│
├── components/              # Generic UI components
│   ├── ui/                  # Button, Input, Modal, etc.
│   ├── layout/              # Navbar, Sidebar
│   ├── feedback/            # Toasts, Loaders
│   └── task/                # TaskCard, TaskActions
│
├── context/                 # Global state/context
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── features/                # Feature-based modules
│   ├── auth/                # Login/Signup
│   │   ├── pages/
│   │   └── components/
│   ├── tasks/               # Post/View/Assign
│   │   ├── pages/
│   │   └── components/
│   ├── dashboard/           # Client & Freelancer dashboards
│   ├── chat/                # Future chat system
│   └── payments/            # Razorpay integration
│
├── hooks/                   # Custom reusable hooks
│   ├── useAuth.js
│   ├── useToast.js
│   └── useFirestore.js
│
├── routes/                  # App-wide route definitions
│   └── AppRoutes.jsx
│
├── services/                # Firebase service logic
│   ├── firebase.js
│   ├── authService.js
│   ├── taskService.js
│   ├── applicationService.js
│   ├── userService.js
│   └── paymentService.js
│
├── utils/                   # Helper files
│   ├── formatDate.js
│   ├── constants.js
│   └── validations.js
│
├── App.jsx                  # Main App entry point
├── index.js                 # Vite entry file
└── index.css                # Tailwind setup


---

## 🏗 System-Level Architecture (Frontend + Backend)


[ User (Browser) ]
        ↓
[ React App (Vite) ]
        ↓
[ Firebase SDK ]
        ↓
[ Firebase Services ]
    ├─ 🔐 Auth → createUser, login, logout
    ├─ 📄 Firestore → users, tasks, applications
    ├─ 💳 Payments (Razorpay or Firestore)
    └─ 📦 Hosting (Deploy your frontend here)


---

## 🔌 Firebase Collections Overview


/users/{uid} → {
  name, email, role: "client" | "freelancer"
}

/tasks/{taskId} → {
  title, description, postedBy, assignedTo, status, budget
}

/tasks/{taskId}/applications/{userId} → {
  appliedAt: Timestamp
}

/payments/{paymentId} → {
  userId, taskId, amount, method, status
}


---

## 🧭 Data & Routing Flow Example


Route: /post-task
  → Page: PostTask.jsx
    → Uses: TaskForm.jsx, Button.jsx
    → Calls: taskService.createTask()
    → Saves task in Firestore

Route: /dashboard
  → Page: ClientDashboard.jsx
    → Fetches tasks using: taskService.getUserTasks()
    → Shows: TaskCard + ApplicationList

Route: /tasks
  → Page: TaskList.jsx
    → Lists all open tasks
    → Uses: getAllOpenTasks()
    → Apply Button → applicationService.applyToTask()
