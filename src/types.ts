export interface DedentOptions {
	alignValues?: boolean;
	escapeSpecialCharacters?: boolean;
	trimWhitespace?: boolean;
}

export interface Dedent {
	(literals: string): string;
	(strings: TemplateStringsArray, ...values: unknown[]): string;
	withOptions: CreateDedent;
}

export type CreateDedent = (options: DedentOptions) => Dedent;
