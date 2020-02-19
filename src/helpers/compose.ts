export const compose = <T>(...fns: Function[]) => (x: T): T =>
  fns.reduceRight((v, f) => f(v), x);

export const pipe = <T>(...fns: Function[]) => (x: T): T =>
  fns.reduce((v, f) => f(v), x);

export const Identity = <T>(x: T): T => x;
