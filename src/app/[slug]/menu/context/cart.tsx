'use client'

import { Product } from "@prisma/client"
import { createContext, ReactNode, useState } from "react"

export interface CartProduct 
  extends Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'> {
  quantity: number
}

export interface ICartContext {
  isOpen: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProduct: (product: CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => { },
  addProduct: () => { }
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggleCart() {
    setIsOpen((prev) => !prev)
  }

  function addProduct(product: CartProduct) {
    // verificar se o produto esta no carrinho
    // se estiver, aumentar a quantidade
    // se nao estiver, adicione
    const productAlreadyInCart = products.some(prevProduct => prevProduct.id === product.id)
    if (!productAlreadyInCart) {
      return setProducts(prev => [...prev, product])
    }
    setProducts(prevProducts => {
      return prevProducts.map(prevProduct => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity
          }
        }
        return prevProduct
      })
    })
  }


  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct
      }}
    >
      {children}
    </CartContext.Provider>
  )
}