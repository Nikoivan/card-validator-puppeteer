export default function checkPaySys(value) {
  const cardCollection = [
    { paySys: "visa", re: /^4/ },
    { paySys: "master-card", re: /^5[1-5]/ },
    { paySys: "amex", re: /^3[47]/ },
    { paySys: "discover", re: /^60/ },
    { paySys: "jcb", re: /^3[15]/ },
    { paySys: "diner", re: /^3[068]/ },
    { paySys: "mir", re: /^2/ },
  ];

  const paySystem = cardCollection.find((el) => el.re.test(value));
  if (paySystem) {
    return paySystem.paySys;
  } else {
    throw new Error("Тип платежной системы неопределен");
  }
}
