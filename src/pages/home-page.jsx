import React from "react";
import { Button } from "@/components/ui/button";
import { FormBackground } from "../components/form-background";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <main className="relative h-[80vh] flex flex-col justify-center items-center gap-4 mt-14">
        <FormBackground />
        <div className="relative text-center space-y-6 px-4">
          <h1 className="text-7xl font-semibold">Build Forms Faster</h1>
          <p className="text-2xl text-muted-foreground max-w-2xl">
            Create forms with Shadcn, react-hook-form and zod within minutes.
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              className="px-8 py-3 text-lg rounded-full pointer-coarse:"
              onClick={() => navigate("/playground")}
            >
              Go To Playground
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
