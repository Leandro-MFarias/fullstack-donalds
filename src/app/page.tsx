import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <Link href={'/fsw-donalds'}>
        <Button className="w-[260px]" variant={'destructive'}>
          <img src="/dine_in.png" alt="hambúrguer" className="w-4" />
          McDonald's
        </Button>
      </Link>
      <Button className="w-[260px]" variant={'secondary'} disabled={true}>
        <Loader2Icon className="animate-spin" />
        Restaurante em construção
      </Button>
    </div>
  );
}