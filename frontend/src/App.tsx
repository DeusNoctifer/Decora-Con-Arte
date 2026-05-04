import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/health/")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setData(data);
      })
      .catch((err) => {
        console.error("ERROR:", err);
        setError(err);
      });
  }, []);

  return (
    <div>
      <h1>Test CORS</h1>
      {error && <p>Error: {String(error)}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;