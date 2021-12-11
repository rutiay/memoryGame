import "./History.css";
function History({ timeHistory, visibility }) {
  return (
    <div style={{visibility: visibility}}>
      <div className="chart">
        <div>
          {timeHistory.map((item, i) => {
            return <li key={i}>{item}sec</li>;
          })}
        </div>
      </div>
    </div>
  );
}
export default History;
