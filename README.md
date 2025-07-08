# 🧠 Indorve – Student Task Marketplace

**Indorve** is a full-stack web platform that connects:
- 👨 Clients: Students who need tasks done (assignments, presentations, etc.)
- 👩 Freelancers: Students who want to earn by doing those tasks.

Built with **React + Firebase** and designed for scalability and collaboration.

---

## 🚀 MVP Features (Stage 1)

- 🔐 Authentication (Signup/Login)
- 📝 Post a task (title, description, deadline, budget)
- 📋 Browse & Apply to tasks
- 🗂 Client Dashboard to manage tasks & applicants
- ✅ Assign freelancer to task
- 💳 (Optional) Basic Razorpay integration
- 📦 Firebase Hosting

---

## 🛠️ Tech Stack

| Layer      | Technology            |
|------------|------------------------|
| Frontend   | React + Vite           |
| Styling    | Tailwind CSS           |
| Routing    | React Router DOM       |
| Backend    | Firebase Auth + Firestore |
| Hosting    | Firebase Hosting       |
| Payments   | Razorpay (Test Mode)   |

---

## 📂 Folder Structure

```
indorve/
├── public/                # Vite index.html
├── src/
│   ├── assets/            # Images, icons
│   ├── components/        # Reusable UI components
│   ├── context/           # Global app state (Auth)
│   ├── features/          # Feature-based modules
│   ├── hooks/             # Custom React hooks
│   ├── routes/            # All app routes
│   ├── services/          # Firebase interaction logic
│   ├── utils/             # Helper functions, constants
│   ├── App.jsx            # Root component
│   ├── index.js           # App entry
│   └── index.css          # Tailwind setup
├── .env                   # Firebase config vars
├── firebase.json          # Hosting config
├── package.json
└── README.md              # You're here
```

---

## 🔁 Logic Flow: How It Works

### 1. 🔐 Authentication

- `authService.js` handles login/signup using Firebase Auth.
- `AuthContext.jsx` tracks and provides the current user globally.
- `useAuth()` hook helps access user state anywhere in the app.

### 2. 📝 Post a Task

- Clients use `PostTask.jsx` to submit a new task.
- `taskService.createTask()` saves task to Firestore.
- Task is visible to all freelancers on the home page.

### 3. 📋 View & Apply to Tasks

- Freelancers see tasks in `TaskList.jsx` via `getAllOpenTasks()`.
- Click "Apply" → calls `applicationService.applyToTask()` → saves to `/tasks/{id}/applications/`.

### 4. 🗂 Client Dashboard

- Clients view all posted tasks via `getUserTasks()`.
- View applicants for each task under `ApplicationList`.

### 5. ✅ Assign Freelancer

- Client selects one applicant → calls `assignFreelancer()` in `taskService.js`.
- Task's `assignedTo` field is updated.

### 6. 💳 Payments (Optional)

- Razorpay popup on client side in `Checkout.jsx`.
- On success, save to `/payments/` Firestore collection.

---

## 🧠 Firebase Collections Overview

```js
/users/{uid} → { name, email, role }

/tasks/{taskId} → {
  title, description, postedBy, assignedTo, status
}

/tasks/{taskId}/applications/{userId} → {
  appliedAt: Timestamp
}

/payments/{paymentId} → {
  userId, taskId, amount, status
}
```

---

## 🔐 Firestore Security Rules (Sample)

```js
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}
match /tasks/{taskId} {
  allow read: if true;
  allow write: if request.auth.uid == request.resource.data.postedBy;
}
match /tasks/{taskId}/applications/{userId} {
  allow write: if request.auth.uid == userId;
  allow read: if request.auth.uid != null;
}
```

---

## 🧑‍💻 Developer Guide

### 📦 Install & Run

```bash
npm install
npm run dev
```

### 🔐 Firebase Setup

1. Create Firebase project: https://console.firebase.google.com/
2. Enable Email/Password Auth
3. Create Firestore DB
4. Add `.env`:

```
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxx
VITE_FIREBASE_PROJECT_ID=xxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=xxxxx
```

---

### ✨ Deployment (Firebase Hosting)

```bash
npm run build
firebase init    # Select Hosting & Firestore
firebase deploy
```

---

## 👥 Developer Team Roles

| Role           | Tasks                                             |
|----------------|---------------------------------------------------|
| UI Developers  | Build reusable buttons, inputs, modals, etc.     |
| Page Developers| Build features like PostTask, TaskList, Dashboard|
| Lead Developer | Connect Firebase logic, context, routing         |

---

## 📚 Key Files Explained

| File                                  | Purpose                            |
|---------------------------------------|-------------------------------------|
| `firebase.js`                         | Firebase config & app init          |
| `authService.js`                      | Login, signup, logout logic         |
| `taskService.js`                      | Create, read, update tasks          |
| `applicationService.js`              | Apply to tasks                      |
| `AuthContext.jsx`                    | Store and provide current user      |
| `AppRoutes.jsx`                       | Routing and route protection        |
| `PostTask.jsx`, `TaskList.jsx`        | Feature page UIs                    |
| `TaskCard.jsx`, `TaskForm.jsx`        | Task-related UI components          |

---

## 🚦 Dev Flow Summary

```
1. Junior Devs build UI components
2. Pages team uses those components in PostTask, TaskList, etc.
3. Lead Dev implements Firebase logic via services
4. Pages are connected to logic
5. Full app is tested and deployed
```

---

## ✅ Checklist (MVP Stage 1)

- [x] Firebase configured
- [x] Auth working
- [x] Post + list tasks
- [x] Apply to tasks
- [ ] Assign freelancers
- [ ] (Optional) Payment test
- [ ] Deploy to Firebase Hosting

---

<!-- ## 🧃 Want More?

- ✅ Ready-to-use dummy data
- ✅ Admin panel (optional)
- ✅ Notifications (push/email)
- ✅ Chat (Firestore-based)
- ✅ Upgrade to Supabase or Node backend

Let’s keep building 🚀

--- -->

