import React, { useState,  useEffect } from "react";
import './App.css';
import HomePage from './pages/homepage';





function App() {
const fakeCardData = []
const [data, setData] = useState({});
  // pass id to fetch relevant data
  const url = 'http://localhost:8080/studyspots'
  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        // save data from fetch request to state
        setData(r);
      });
  }, [url]);
  console.log(data)
  for (var i = 0; i < data.length; i++) {
    fakeCardData.push({name: data[i].name, avgRating: data[i].avgRating})
  }

  console.log(data)


  return (
    <div className="App">
      <HomePage cards={fakeCardData} />
    </div>
  );
}

export default App;
