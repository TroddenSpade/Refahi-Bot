test("timestamp 1582317000000 is 0 mod 7 (first day of week == Saturday)", () => {
  let date = new Date(parseInt("1582317000000"));
  expect((date.getDay() + 1) % 7).toBe(0);
});
