// components/VerifyEmailButton.jsx
import { useAuthActions } from "../../hooks/useAuth";
import { useState } from "react";

export default function VerifyEmailButton() {
  const { sendEmailVerificationToUser } = useAuthActions();
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      console.log("trying to verify");
      await sendEmailVerificationToUser();
      console.log("verification initiated");
      setMessage("Verification email sent! Please check your inbox.");
    } catch (error) {
      setMessage("Failed to send email: " + error.message);
    }
  };

  return (
    <div className="p-2">
      <button
        onClick={handleVerify}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Send Verification Email
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
