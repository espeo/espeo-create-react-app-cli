type Func<T, R> = (a: T) => R;

export function compose<F extends Function>(f: F): F;

export function compose<A, T, R>(f1: (a: A) => R, f2: Func<T, A>): Func<T, R>;

export function compose<A, B, T, R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>,
): Func<T, R>;

export function compose<A, R>(...fns: Function[]): (a: A) => R;

export function compose(...fns: Function[]) {
  return <T>(x: T): T => fns.reduceRight((v, f) => f(v), x);
}

export const Identity = <T>(x: T): T => x;
