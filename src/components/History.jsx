import "./History.css";
function History({ timeHistory }) {
  return (
    <div className="chart">
      <div>
        {timeHistory.map((item, i) => {
          return (
            <li key={i}>
              {item}sec
            </li>
          );
        })}
      </div>
    </div>
  );
}
export default History;
