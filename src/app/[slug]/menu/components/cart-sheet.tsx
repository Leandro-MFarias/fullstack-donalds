import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import { CartProductItem } from "./cart-product-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import { FinishOrderDialog } from "./finish-order-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function CartSheet() {
  const { isOpen, toggleCart, products, total } = useContext(CartContext)
  const [finishOrderDialogOpen, setFinishOrderDialogOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[85%] pt-8">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full py-5">
          <div className="flex-auto overflow-hidden -mx-5 space-y-2">
            <ScrollArea className="h-full px-5">
              <div className="flex flex-col gap-5">
                {products.map(product => (
                  <CartProductItem key={product.id} product={product} />
                ))}
              </div>
            </ScrollArea>
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full rounded-full" onClick={() => setFinishOrderDialogOpen(true)}>Finalizar pedido</Button>
          <FinishOrderDialog open={finishOrderDialogOpen} onOpenChange={setFinishOrderDialogOpen} />
        </div>
      </SheetContent>
    </Sheet>
  )
}