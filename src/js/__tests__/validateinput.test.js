import { validateLocation } from '../geoposition';

test.each([
  ['valid input 1', '51.50851, −0.12572', true],
  ['valid input 2', '51.50851,−0.12572', true],
  ['valid input 3', '[51.50851, −0.12572]', true],
  ['invalid input 1', '123 123', false],
  ['invalid input 2', '123, 123', false],
])(('Validate location %s'), (_, input, expected) => {
  expect(validateLocation(input)).toBe(expected);
});
