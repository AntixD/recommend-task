export function chunkText(text: string, chunkSize: number = 5): string[] {
  const words = text.split(' ');
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    chunks.push(chunk + (i + chunkSize < words.length ? ' ' : ''));
  }

  return chunks;
}

export function randomDelay(base: number, variance: number = 0.5): number {
  const min = base * (1 - variance);
  const max = base * (1 + variance);
  return Math.random() * (max - min) + min;
}
