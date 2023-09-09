import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingForm from "../../components/OnboardingForm";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <OnboardingForm />
    </div>
  );
};

export default Onboarding;
