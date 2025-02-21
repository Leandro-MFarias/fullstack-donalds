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
  total: number
  toggleCart: () => void
  addProduct: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProduct: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  toggleCart: () => { },
  addProduct: () => { },
  decreaseProductQuantity: () => { },
  increaseProductQuantity: () => {},
  removeProduct: () => {}
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity
  },0)

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

  function decreaseProductQuantity(productId: string) {
    setProducts(prevProducts => {
      return prevProducts.map(prevProduct => {
        if (prevProduct.id !== productId) {
          return prevProduct
        }
        if (prevProduct.quantity === 1) {
          return prevProduct
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 }
      })
    })
  }

  function increaseProductQuantity(productId: string) {
    setProducts(prevProducts => {
      return prevProducts.map(prevProduct => {
        if(prevProduct.id !== productId) {
          return prevProduct
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 }
      })
    })
  }

  function removeProduct(productId: string) {
    setProducts(prevProducs => prevProducs.filter(prevProduct => prevProduct.id !== productId))
  }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}