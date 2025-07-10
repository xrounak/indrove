// src/routes/TestBoard.jsx
export const TestBoard = ({ user, userData, onClick, vistauth }) => {
  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>

      {user ? (
        <>
          <p className="text-sm mb-1">Logged in as: {user.email}</p>
          <p className="text-sm mb-4">Role: {userData?.role}</p>
          <button
            type="button"
            onClick={onClick}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <p className="text-base mb-2">You're not logged in.</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={vistauth}
          >
            Get Started
          </button>
        </>
      )}
    </div>
  );
};
