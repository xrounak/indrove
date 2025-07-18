// src/services/taskService.js
import { db } from "./firebase";
import { collection, doc, addDoc, getDocs, getDoc, query, where, updateDoc, serverTimestamp,deleteDoc } from "firebase/firestore";

// Create Task
export const createTask = async (taskData) => {
  return await addDoc(collection(db, "tasks"), {
    ...taskData,
    status: "open",
    assignedTo:null,
    createdAt: serverTimestamp(),
    assignedAt:null,
    submittedAt:null,
    completedAt:null,
    applicant:[],
  });
};

// Get tasks posted by a client
export const getClientTasks = async (uid) => {
  const q = query(collection(db, "tasks"), where("postedBy", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get task by ID
export const getTaskById = async (taskId) => {
  const snap = await getDoc(doc(db, "tasks", taskId));
  return { id: snap.id, ...snap.data() };
};

// Get user task related stats 

export const fetchTaskStatsByUser = async (uid) => {
  const taskRef = collection(db, 'tasks');
  const q = query(taskRef, where('postedBy', '==', uid));
  const snapshot = await getDocs(q);

  let totalSpent = 0;
  let open = 0;
  let inProgress = 0;
  let completed = 0;

  snapshot.forEach(doc => {
    const task = doc.data();

    if (task.status === 'open') open++;
    else if (task.status === 'assigned') inProgress++;
    else if (task.status === 'completed') {
      completed++;
      totalSpent += parseFloat(task.budget) || 0;
    }
  });

  return {
    open,
    inProgress,
    completed,
    totalSpent
  };
};

// Update a task by ID
export const updateTask = async (taskId, updatedData) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
    ...updatedData,
    updatedAt: serverTimestamp(),
  });
};

// Delete a task by ID
export const deleteTask = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
};




// =========================
// 🚀 FREELANCER SERVICES
// =========================

// Fettch All Task


export const fetchAllTasks = async () => {
  const snap = await getDocs(collection(db, "tasks"));
  const tasks = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(snap);
  console.log(tasks);
  return tasks;
};

/**
 * Apply to a task (adds freelancer UID to 'applicant' array)
 */
export const applyToTask = async (taskId, freelancerUid) => {
  const taskRef = doc(db, "tasks", taskId);
  const snap = await getDoc(taskRef);
  
    console.log("appling to task", snap.data());
    console.log("by user uid: ",freelancerUid);
  if (!snap.exists()) throw new Error("Task does not exist");

  const data = snap.data();
  const currentApplicants = Array.isArray(data.applicant) ? data.applicant : [];

  // Avoid duplicate applications
  if (currentApplicants.includes(freelancerUid)) {
    throw new Error("You have already applied to this task.");
  }

  await updateDoc(taskRef, {
    applicant: [...currentApplicants, freelancerUid],
    updatedAt: serverTimestamp(),
  });
};


/**
 * Fetch tasks that the freelancer has applied to
 */
export const getAppliedTasks = async (freelancerUid) => {
  const q = query(collection(db, "tasks"), where("applicant", "array-contains", freelancerUid));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Fetch tasks assigned to a freelancer
 */
export const getAssignedTasks = async (freelancerUid) => {
  const q = query(collection(db, "tasks"), where("assignedTo", "==", freelancerUid));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Submit work (mark task as submitted, optionally upload submission URL)
 */
export const submitTaskWork = async (taskId, submissionData = {}) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
    ...submissionData, // e.g., { submissionUrl: "...", comment: "..." }
    status: "submitted",
    submittedAt: serverTimestamp(),
  });
};

/**
 * Mark task as completed (Client-side usually)
 */
export const markTaskAsCompleted = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
    status: "completed",
    completedAt: serverTimestamp(),
  });
};
