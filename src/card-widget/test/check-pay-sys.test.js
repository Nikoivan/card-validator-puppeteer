import checkPaySys from "../check-pay-sys";

const paySysTestList = [
  [4716468925085991, "visa"],
  [5548138161860800, "master-card"],
  [343557931672302, "amex"],
  [6011950476602289, "discover"],
  [3530967404972849, "jcb"],
  [36876965666598, "diner"],
  [22000202456789, "mir"],
];

test.each(paySysTestList)(
  "testing number of card %q and expect result %w",
  (numberOfCard, paySys) => {
    expect(checkPaySys(numberOfCard)).toBe(paySys);
  }
);

test("for check to throw of error by function checkPaySys", () => {
  expect(() => checkPaySys(110000000000000)).toThrow(
    "Тип платежной системы неопределен"
  );
});
