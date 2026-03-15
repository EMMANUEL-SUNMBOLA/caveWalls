import React from "react";
// import { Input } from "@components/ui/input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInput } from "../hooks/useInput";
import { validateInputs } from "../hooks/useInputValidation";
import { User } from "lucide-react";

export default function Login() {
  const emailInput = useInput("", {
    tomatch: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    id: "email",
    message: "please enter a valid email",
  });

  const passwordInput = useInput("", {
    tomatch: new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ),
    id: "password",
    message: "please enter a stronger password",
  });

  const isValid = validateInputs([emailInput, passwordInput]);
  return (
    <div className="w-full min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="md:w-lg md:min-h-[40vh] md:max-h-[75vh] w-full min-h-screen bg-white rounded-sm md:p-8 p-4">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="bg-gray-300 size-18 rounded-full flex items-center justify-center">
            <User />
          </div>
          <h1 className="text-lg font-bold text-gray-700">Welcome back</h1>
        </div>
        <div>
          {/* <h1 className="text-lg font-bold text-gray-700">Log In</h1> */}
          <div className="flex flex-col gap-3">
            <Input
              label="Email"
              placeholder="testemail@caveman.com"
              {...emailInput}
            />
            <Input
              label="Password"
              password={true}
              placeholder="********"
              {...passwordInput}
            />
            <Button disabled={!isValid} className="w-full">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
