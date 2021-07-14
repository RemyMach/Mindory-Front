export function shuffleArray(inputArray: any[], numberFixed: number | null): void{
  inputArray.sort(() => numberFixed ? numberFixed : Math.random() - 0.5 );
}
