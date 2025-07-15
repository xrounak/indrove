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
    else if (task.status === 'in-progress') inProgress++;
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
