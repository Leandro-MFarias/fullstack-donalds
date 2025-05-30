import Image from "next/image"
import { CartContext, CartProduct } from "../context/cart"
import { formatCurrency } from "@/helpers/format-currency"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react"
import { useContext } from "react"

interface CartItemProps {
  product: CartProduct
}

export function CartProductItem({ product }: CartItemProps) {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } = useContext(CartContext)

  return (
    <div className="flex justify-between items-center">
      {/* ESQUERDA */}
      <div className="flex items-center gap-2 flex-1 w-full">
        <div className="relative size-20 flex-shrink-0 bg-gray-100 rounded-xl">
          <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-1" />
        </div>
        <div className="space-y-1 min-w-[160px] max-w-40">
          <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
          <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>

          <div className="flex items-center gap-1 text-center">
            <Button onClick={() => decreaseProductQuantity(product.id)} className="h-7 w-7 rounded-lg" variant={'outline'}>
              <ChevronLeftIcon />
            </Button>

            <p className="w-7 text-xs">{product.quantity}</p>

            <Button onClick={() => increaseProductQuantity(product.id)} className="h-7 w-7 rounded-lg" variant={'destructive'}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      {/* BOTAO DELETAR */}
      <Button onClick={() => removeProduct(product.id)} className="h-7 w-7 flex-shrink-0 rounded-lg"  variant={'outline'}>
        <TrashIcon />
      </Button>
    </div>
  )
}