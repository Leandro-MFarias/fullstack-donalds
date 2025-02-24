import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ConsumptionOption } from "./components/consumption-option";
import { ButtonGoBack } from "./menu/components/button-back";
interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  // const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) return notFound();

  return (
    <section className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <ButtonGoBack />
      {/* lOGO E TITULO */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-bold">{restaurant.name}</h2>
      </div>
      {/* BEM VINDO */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos oferecendo
          praticidade e sabor em cada detalhe!
        </p>
      </div>
      {/*  */}
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionOption
          imageUrl="/dine_in.png"
          imageAlt="comer aqui"
          buttonText="Para comer aqui"
          option="DINE_IN"
          slug={slug}
        />
        <ConsumptionOption
          imageUrl="/take_away.png"
          imageAlt="Para Levar"
          buttonText="Para levar"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>
    </section>
  );
}
