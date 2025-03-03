"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { isValidCpf } from "../helpers/cpf";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOrder } from "../actions/create-order";
import { useParams, useSearchParams } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";
import { CartContext } from "../context/cart";
import { useContext, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { createStripeCheckout } from "../actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js"

const formScheme = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatorio",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido",
    }),
});

type FormScheme = z.infer<typeof formScheme>;

// SERVER ACTIONS
// - funções que são executados no servidor, mas podem ser chamadas de client components

interface FinishOrderDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
}

export function FinishOrderDialog({ open, onOpenChange }: FinishOrderDialogProps) {
  const { slug } = useParams<{ slug: string }>()
  const { products } = useContext(CartContext)
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormScheme>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  async function onSubmit(data: FormScheme) {
    try {
      setIsLoading(true)
      const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod

      const order = await createOrder({
        consumptionMethod,
        customerCpf: data.cpf,
        customerName: data.name,
        products,
        slug,
      })
      const { sessionId } = await createStripeCheckout({ 
        products, 
        orderId: order.id,
        slug,
        consumptionMethod,
        cpf: data.cpf
      })
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) return
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,)
      stripe?.redirectToCheckout({
        sessionId: sessionId,
      })
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>

      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2Icon className="animate-spin" />}
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button className="w-full rounded-full" variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
