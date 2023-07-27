export interface DedentOptions {
  escapeSpecialCharacters?: boolean;
}

export interface Dedent {
  (literals: string): string;
  (strings: TemplateStringsArray, ...values: unknown[]): string;
  options: CreateDedent;
}

export type CreateDedent = (options: DedentOptions) => Dedent;
