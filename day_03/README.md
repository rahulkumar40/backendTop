import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
function App() {
  const [jokes, setJokes] = useState([]);
  const fetchData = () => {
     axios
      .get(`/api/v1/jokes`)
      .then((res) => {
        setJokes(res.data);
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };
// url object like same as origin same kr dega proxy 
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h1>My name is Rahul Kumar</h1>
      <p>Jokes : {jokes.length}</p>

      {jokes.length > 0 && (
        <div>
          {jokes.map((joke) => {
            return (
              <div key={joke.id}>
                <h3>{joke.title}</h3>
                <p>{joke.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
