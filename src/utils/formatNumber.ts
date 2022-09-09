export function formatNumber(inputNumber: number): string {
    return inputNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
  }