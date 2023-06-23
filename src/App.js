import { useEffect, useState } from "react";
import { fetchData } from "./data";

function App() {

  const [result, setResult] = useState([]);

  useEffect(() => {
    (async function getData() {
      (async function () {
        const data = await fetchData();
        setResult(data);
      })();
    })();
  }, []);

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Retailers Reward Points</h1>
      {result.map((reward, idx) => {
        const months = Object.keys(reward.monthly);
        const monthsRewards = Object.values(reward.monthly);
      return (
      <table width="75%">
        <tr>
          {/* <th>{reward.id}</th> */}
          <th><span style={{color:"blue"}}>Customer Name:&nbsp;&nbsp;{reward.customerName}</span>
          <th><span style={{color:"green"}}>Total Reward Points:&nbsp;&nbsp;{reward.total}</span></th>
            <table style={{border: "0.5px solid green"}} width="75%">
              <tr>
                <th colspan="100%">Monthly Rewards</th>
              </tr>
                  {months.map((month, idx) => (
                    <tr>
                      <td key={`${month}-${idx}`}>{month}</td>
                      <td style={{fontWeight:"normal"}}>{monthsRewards[idx]}</td>
                  </tr>
                  ))}
                  <br></br><br></br>

            </table>
          </th>
        </tr>
      </table>
      );
      })
    };
    </div>
   );
}

export default App;