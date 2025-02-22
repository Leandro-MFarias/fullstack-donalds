'use client'

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollText } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">
}

export function ProductHeader({ product }: ProductHeaderProps) {
  const {slug} = useParams<{slug: string}>()
  const router = useRouter()

  const handleBackClick = () => router.back()
  const handleOrdersClick = () => router.push(`/${slug}/orders`)
  

  return (
    <div className="relative w-full min-h-[300px]">
        <Button
          variant={"secondary"}
          size="icon"
          className="absolute left-4 top-4 z-50 rounded-full"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>
        <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
        <Button
          variant={"secondary"}
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full"
          onClick={handleOrdersClick}
        >
          <ScrollText />
        </Button>
      </div>
  )
}