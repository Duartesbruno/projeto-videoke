export default function MusicTable({ data, loading }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!data.length) {
    return <p className="empty">Nenhuma música encontrada</p>;
  }
  
  const headers = Object.keys(data[0])
  .filter((header) => header.toLowerCase() !== "pacotes")
  .sort((a, b) => {
    if (a.toLowerCase() === "codigo") return -1;
    if (b.toLowerCase() === "codigo") return 1;
    return 0;
  });

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}