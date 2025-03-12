
function App() {
  return (
    <>
      <div className="page">
        <div className="title">UIKIT</div>
        <table className="table-auto w-full hover">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>

        <br />
        <input type="text" />
        <br />
        <input type="text" className="error" />
        <br />

        <button className="btn">Default</button>
        <button className="btn" disabled>
          Disabled
        </button>
        <button className="btn dark">Dark</button>
        <button className="btn danger">Danger</button>
        <button className="btn primary">Primary</button>
        <button className="btn accent">Accent</button>
        <button className="btn success">Success</button>
        <button className="btn outline">Outline</button>
        <button className="btn outline lg">Outline</button>
      </div>

    </>
  );
}

export default App;
