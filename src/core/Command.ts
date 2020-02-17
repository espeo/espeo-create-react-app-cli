export type Command<T> = (options: T) => Promise<void> | void;
