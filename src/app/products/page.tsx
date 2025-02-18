import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  return (
    <div className="rounded-xl border border-red-500 p-5">
      <h1 className="text-red-500">Pagina de Produtos</h1>
      <Button>Clicar</Button>
      <Input placeholder="Comecando a usar o uishad" />
    </div>
  );
}
