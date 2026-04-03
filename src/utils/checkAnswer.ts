export function normalizeCommand(cmd: string): string {
  return cmd.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function checkAnswer(input: string, acceptedAnswers: readonly string[]): boolean {
  const normalized = normalizeCommand(input);
  return acceptedAnswers.some(answer => normalizeCommand(answer) === normalized);
}
