import { useState } from "react";
import logo from "./resources/Logo.svg"
import editLogo from "./resources/Edit_duotone.svg"

function App() {
  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="gird-row-3 w-1/2">
          <div className="flex mt-10">
            <img src={logo} alt="My Task Board Logo"/>
            <h1 className="">My Task Board</h1>
            <img src={editLogo} alt="Edit Logo" />
          </div>
          <div>
            <h1>Task to keep organised</h1>
          </div>
          <div>
            zzzz
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
