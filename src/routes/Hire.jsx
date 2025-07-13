// // src/routes/Hire.jsx
import { Routes, Route, Navigate } from "react-router-dom";
// import Profile from "../features/Hire/0Profile/Profile";
import Dashboard from "../features/Hire/1Dashboard/Dashboard";
import PostTaskForm from "../features/Hire/2PostTasks/PostTaskForm";
// import PostedTasks from "../features/Hire/3PostedTasks/PostedTasks";
// import CollectedTasks from "../features/Hire/4CollectTasks/CollectedTasks";

export default function HireRoutes() {

  console.log("rendering hireroute")
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/profile" element={<Profile />} />  */}
      <Route path="/post-task" element={<PostTaskForm />} />
      {/* <Route path="/posted-tasks" element={<PostedTasks />} /> */}
      {/* <Route path="/collected-tasks" element={<CollectedTasks />} /> */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}
