'use client'

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import { CartSheet } from "../../components/cart-sheet";


interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true
        }
      }
    }
  }>
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { toggleCart, addProduct } = useContext(CartContext)

  const [quantity, setQuantity] = useState<number>(1)

  function handleDecrease() {
    setQuantity((prev) => {
      if (prev === 1) return 1
      return prev - 1
    })
  }

  function handleIncrease() {
    setQuantity((prev) => prev + 1)
  }

  function handleAddToCart() {
    addProduct({
      ...product, 
      quantity
    })
    toggleCart()
  }

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col rounded-t-3xl p-5 overflow-hidden">
        <div className="flex-auto overflow-hidden">
          {/* RESTAURANT */}
          <div className="flex items-center gap-1.5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />

            <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
          </div>

          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

          {/* PREÇO E QUANTIDADE */}
          <div className="flex items-center justify-between mt-3">
            <h3 className="text-xl font-semibold">{formatCurrency(product.price)}</h3>
            <div className="flex items-center gap-3 text-center">
              <Button onClick={handleDecrease} variant={'outline'} className="w-8 h-8 rounded-xl">
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button onClick={handleIncrease} variant={'destructive'} className="w-8 h-8 rounded-xl">
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full">
            {/* SOBRE */}
            <div className="mt-6 space-y-3 ">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            {/* Ingredientes */}
            <div className="mt-6 space-y-3 ">
              <div className="flex items-center gap-1">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>
              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map(ingredient => (
                  <li key={ingredient}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>

        </div>
        {/* BOTÃO DE ADICIONAR AO CARRINHO */}
        <Button onClick={handleAddToCart} className="rounded-full w-full">Adicionar à sacola</Button>
      </div>

      <CartSheet />
    </>
  );
}