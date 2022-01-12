
import { useState } from 'react';
import './App.css';
import Profile from './Profile';

function App() {
  const [disp, setDisplay] = useState("grid")
  return (
    <div className="App" style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f28ab2"}}>
      <div className="container" style={{margin: "5rem 0", padding: "1.5rem 2rem", backgroundColor: "white", width: "30vw", borderRadius: "5px", boxShadow: "5px 5px 5px 5px"}}>
        <h2>5 birthdays today</h2>
        <Profile picture={"mbappe.jpeg"} Name={"Kylian Mbappe"} Age={"22 years"} disp={disp} />
        <Profile picture={"goat.jpeg"} Name={"Lionel Messi"} Age={"33 years"} disp={disp} />
        <Profile picture={"Lewa.jpeg"} Name={"Lewandowski"} Age={"32 years"} disp={disp} />
        <Profile picture={"ronaldo.jpeg"} Name={"Cristiano Ronaldo"} Age={"36 years"} disp={disp} />
        <Profile picture={"ibra.jpeg"} Name={"Zlatan Ibrahimovic"} Age={"38 years"} disp={disp} />
        <button onClick={() => setDisplay("none")} style={{width: "80%", height: "40px", color: "white", backgroundColor: "#f28ab2"}}>Clear all </button>
      </div>
      
    </div>
  );
}

export default App;
