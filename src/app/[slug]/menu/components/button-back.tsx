'use client'

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function ButtonGoBack() {
  const router = useRouter()

  function handleBackClick() {
    router.back()
  }

  return (
    <Button
      variant={"secondary"}
      size="icon"
      className="absolute left-4 top-4 z-50 rounded-full"
      onClick={handleBackClick}
    >
      <ChevronLeftIcon />
    </Button>
  )
} 