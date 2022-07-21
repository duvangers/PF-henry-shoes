import moment from "moment";

export const options = [
  { title: "Ventas del día", equal: "day", groupBy: "forHour" },
  { title: "Ventas de la semana", equal: "week", groupBy: "byDay" },
  { title: "Ventas del mes", equal: "month", groupBy: "byDay" },
  { title: "Ventas del año", equal: "year", groupBy: "forMonth" },
];
export const filterToday = (array, string = "day") => {
  const hoy = moment();
  return array.filter(
    //Para saber si son iguales a la fecha de hoy
    (u) => moment(u.createdAt).isSame(hoy, string)
  );
  // console.log(`Array de hoy filtrado por ${string}`, a);
  //  return a
};
export const totalPrice = (array) =>
  array.map((o) => o.price_total).reduce((prev, curr) => prev + curr, 0);
export const dataToGraph = (obj) => {
  // console.log("supuesto obj", obj);
  let data = [];
  for (const [key, value] of Object.entries(obj)) {
    data.push({ name: key, Total: totalPrice(value) });
  }
  return data;
};
export const groups = (() => {
  const // by6Hour = (item) => {
    //   const m = moment(item.createdAt);
    //   return (
    //     byDay(item) +
    //     " " +
    //     ["first", "second", "third", "fourth","fifth"][Number(m.format("k")) % 6] +
    //     " 6 hours"
    //   );
    // },
    forMonth = (item) => moment(item.createdAt).format("YYYY MM"),
    forWeek = (item) =>
      forMonth(item) + " sem " + moment(item.createdAt).isoWeek(),
    byDay = (item) => moment(item.createdAt).format("YYYY MM DD"),
    forHour = (item) =>
      byDay(item) + " " + moment(item.createdAt).format("hh a");
  return {
    forMonth,
    forWeek,
    byDay,
    // by6Hour,
    forHour,
  };
})();

export const datas = [
  {
    createdAt: "2022-07-21T14:10:45.540Z",
    price_total: 100,
  },
  {
    createdAt: "2022-07-21T15:28:45.540Z",
    price_total: 200,
  },
  { createdAt: "2022-07-21T15:38:45.540Z", price_total: 424 },
  {
    createdAt: "2022-07-21T16:48:45.540Z",
    price_total: 123,
  },
  {
    createdAt: "2022-07-19T17:28:45.540Z",
    price_total: 102,
  },
  { createdAt: "2022-07-18T14:28:45.540Z", price_total: 240 },
  { createdAt: "2022-07-19T14:28:45.540Z", price_total: 1258 },
  { createdAt: "2022-07-18T15:38:45.540Z", price_total: 424 },
  {
    createdAt: "2022-07-20T16:48:45.540Z",
    price_total: 123,
  },
  {
    createdAt: "2022-07-20T17:28:45.540Z",
    price_total: 102,
  },
  { createdAt: "2022-07-15T14:28:45.540Z", price_total: 240 },
  { createdAt: "2022-07-16T14:28:45.540Z", price_total: 1258 },
  { createdAt: "2022-10-17T14:28:45.540Z", price_total: 124 },
  { createdAt: "2022-09-17T14:28:45.540Z", price_total: 500 },
  { createdAt: "2022-08-18T14:28:45.540Z", price_total: 100 },
  { createdAt: "2022-08-18T14:28:45.540Z", price_total: 500 },
  {
    createdAt: "2020-02-05T14:28:45.540Z",
    price_total: 1000,
  },
  { createdAt: "2020-12-24T11:19:19.034Z", price_total: 40 },
];
