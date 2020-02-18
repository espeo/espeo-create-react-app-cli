import { compose, pipe } from 'helpers';

const add10 = (x: number) => x + 10;
const multipleBy10 = (x: number) => x * 10;

it('should return first function if only one passed', () => {
  const composed = compose(add10);
  expect(composed(10)).toEqual(20);
});

it('should compose functions', () => {
  const composed = compose(multipleBy10, add10);
  expect(composed(10)).toEqual(200);
});

it('should pipe functions', () => {
  const composed = pipe(multipleBy10, add10);
  expect(composed(10)).toEqual(110);
});
