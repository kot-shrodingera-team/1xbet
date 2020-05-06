export function log(text: string): void {
  worker.Helper.WriteLine(text);
  console.warn(new Date(), text);
}
