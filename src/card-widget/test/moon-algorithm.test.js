import moonAlgorithm from "../moon-algoritm";

test("to return true, for function moonAlgorithm", () => {
  expect(moonAlgorithm(4716468925085991)).toBe(true);
});

test("to return false, for function moonAlgorithm", () => {
  expect(moonAlgorithm(4716468925085)).toBe(false);
});
