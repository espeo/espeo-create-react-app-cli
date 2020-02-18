export const compose = (...fns: Function[]) => (x: any) =>
  fns.reduceRight((v, f) => f(v), x);

export const pipe = (...fns: Function[]) => (x: any) =>
  fns.reduce((v, f) => f(v), x);
