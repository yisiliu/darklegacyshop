"use client"; // for Next.js app router
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";

import React, { useState } from "react";
import { Badge } from "./ui/badge";

const VerifyWLD: React.FC<VerifyWLDProps> = () => {
  const [isVerified, setIsVerified] = useState(false);
  const appId: `app_${string}` = process.env
    .NEXT_PUBLIC_WLD_CLIENT_ID as `app_${string}`;
  const handleVerify = async (proof: ISuccessResult) => {
    console.log("googogo");
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
      });

      console.log("res", res);
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Verification failed", errorData);
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
      } else {
        const result = await res.json();
        console.log("Verification succeeded", result);
        // Handle successful verification response
        localStorage.setItem("wld", "true");
      }
    } catch (error) {
      console.error("Error during verification", error);
      throw new Error("Verification failed."); // This message will be displayed to the user
    }
  };

  function onSuccess(result: ISuccessResult): void | Promise<void> {
    setIsVerified(true);
  }

  return (
    <div className="z-[60]">
      {isVerified ? (
        <Badge className="bg-green-500 text-white">Verified</Badge>
      ) : (
        <IDKitWidget
          app_id={appId || ""} // fallback to empty string if undefined
          action={process.env.NEXT_PUBLIC_WLD_CLIENT_SECRET || ""} // fallback to empty string if undefined
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // callback when the proof is received
          verification_level={VerificationLevel.Orb}
        >
          {({ open }) => (
            // This is the button that will open the IDKit modal
            <button onClick={open}>Verify</button>
          )}
        </IDKitWidget>
      )}
    </div>
  );
};

export default VerifyWLD;
