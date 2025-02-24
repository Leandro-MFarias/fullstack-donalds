import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full bg-gradient-to-r from-amber-100 to-orange-200">
      <div className="flex flex-col items-center space-y-2">
        <Image src='/gosnack.png' alt="lore" width={200} height={120} className="bg-transparent" />
      </div>
      <Link href={'/fsw-donalds'}>
        <Button className="w-[320px] h-[56px] rounded-full" variant={'outline'}>
          <img src="/dine_in.png" alt="hambúrguer" className="w-4" />
          McDonald's
        </Button>
      </Link>
    </div>
  );
}