import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../context/cart";
import { CartProductItem } from "./cart-product-item";

export function CartSheet() {
  const { isOpen, toggleCart, products } = useContext(CartContext)

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        {products.map(product => (
          <div key={product.id} className="py-3">
            <CartProductItem product={product} />
          </div>
        ))}
      </SheetContent>
    </Sheet>
  )
}