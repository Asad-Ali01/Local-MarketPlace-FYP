import React from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";


function LoginReminder() {
  const navigate = useNavigate();
    const location = useLocation();
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">
        You should login to view this page
      </h2>

      <p className="text-muted-foreground">
        Please login to continue.
      </p>

      <Button onClick={() => navigate("/login",{
        state:{
            from:location.state?.from
        }
      })}>
        Login
      </Button>
    </div>
  );
}

export default LoginReminder;