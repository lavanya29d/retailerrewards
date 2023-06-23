const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const fetchData = async () => {
  const data = [
    {
      id: 1,
      custName: "Kushal",
      amt: 120,
      trDate: "10-01-2022",
    },
    {
      id: 1,
      custName: "Kushal",
      amt: 50,
      trDate: "07-11-2022",
    },
    {
      id: 1,
      custName: "Kushal",
      amt: 220,
      trDate: "09-09-2022",
    },
    {
      id: 2,
      custName: "John",
      amt: 200,
      trDate: "02-12-2022",
    },
    {
      id: 3,
      custName: "Kapil",
      amt: 80,
      trDate: "12-21-2022",
    },
    {
      id: 3,
      custName: "Kapil",
      amt: 130,
      trDate: "10-21-2022",
    },
    {
      id: 6,
      custName: "Saketh",
      amt: 700,
      trDate: "10-11-2022",
    }
];

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      // sorting the data based on the transaction date first 
      let groups = data.sort((a, b) => {
        let adt = new Date(a.trDate);
        let bdt = new Date(b.trDate);
        return adt - bdt;
      })
      groups = data.reduce((acc, transaction) => {
        //const key = `${transaction.id}-${transaction.trDate.slice(0, 5)}`;
        const key = `${transaction.id}-${transaction.custName}-${new Date(transaction.trDate).getMonth()}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(transaction);
        return acc;
      }, {});

      const result = {};
      for (const key in groups) {
        //const [customerId, _, month] = key.split("-");
        const [customerId, customerName, month] = key.split("-");
        const rewardPoints = groups[key].reduce((acc, transaction) => {
          const { amt } = transaction;
          if (amt > 100) {
            acc += (amt - 100) * 2 + 50;
          } else if (amt > 50) {
            acc += amt - 50;
          }
          return acc;
        }, 0);

        if (!result[customerId]) {
          result[customerId] = { customerName: customerName, total: 0, monthly: {} };
        }
        result[customerId].customerName = key.split("-")[1];
        result[customerId].total += rewardPoints;
        result[customerId].monthly[months[month]] = rewardPoints;
        //console.log(month);
      }
      const result_ = Object.keys(result).map((item) => ({
        id: item,
        ...result[item],
      }));
      resolve(result_);
    }, 1000);
  });
};