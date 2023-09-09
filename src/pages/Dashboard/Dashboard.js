import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CreateGame from "../../components/CreateGame";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isCreateGameOpen, setCreateGameOpen] = useState(false);

  const toggleCreateGame = () => {
    setCreateGameOpen(!isCreateGameOpen);
  };

  const checkOnboardingStatus = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/settings/onboarding-status`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch onboarding status");
        }
        return response.json();
      }) // if the user has not completed onboarding, redirect to onboarding page (data.onboarded = false)
      .then((data) => {
        if (!data.onboarded) {
          navigate("/onboarding");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  return (
    <div>
      {/* Button to open/close the CreateGame form */}
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={toggleCreateGame}
      >
        {isCreateGameOpen ? "-" : "+"}
      </button>

      {/* Conditional rendering of CreateGame component */}
      {isCreateGameOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-70 overflow-auto">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <CreateGame />
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 px-4 rounded-md hover:bg-red-600"
              onClick={toggleCreateGame}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
