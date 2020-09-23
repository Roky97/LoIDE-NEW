export interface ILanguage {
    name: string;
    value: string;
    solvers: ISolver[]
}
export interface ISolver {
    name: string;
    value: string;
    executors: IExecutor[];
    options: IOptions[];
};

export interface IExecutor {
    protocol?: string;
    url?: string;
    name: string;
    value: string;
    path?: string;
    port?: number;
}

export interface IOptions {
    name: string;
    value: string;
    word_argument: boolean;
    description: string;
}