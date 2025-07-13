// src/services/taskService.js
import { db } from "./firebase";
import { collection, doc, addDoc, getDocs, getDoc, query, where, updateDoc, serverTimestamp } from "firebase/firestore";

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