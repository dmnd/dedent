export interface DedentOptions {
	escapeSpecialCharacters?: boolean;
}

export interface Dedent {
	(literals: string): string;
	(strings: TemplateStringsArray, ...values: unknown[]): string;
	withOptions: CreateDedent;
}

export type CreateDedent = (options: DedentOptions) => Dedent;
