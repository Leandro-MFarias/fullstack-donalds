
export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-Br', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}