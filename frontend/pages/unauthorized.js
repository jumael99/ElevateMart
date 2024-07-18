import React, { useEffect } from "react";
import { toastManager } from "@/utils/toastManager";
import { useRouter } from "next/router";

function unauthorized() {
  const router = useRouter();
  useEffect(() => {
    toastManager.error("You are not authorized to view this page");
  }, []);
  setTimeout(() => {
    router.push("/");
  }, 3000);

  return null;
}

export default unauthorized;
