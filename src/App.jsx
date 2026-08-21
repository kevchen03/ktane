import React from "react";
import "./OriginalApp/styling/commonStyles.css";
import "./App.css";
import WireSequences from "./OriginalApp/components/Original/WireSequences/WireSequences";
import ColorFlash from "./OriginalApp/components/Centurion/ColorFlash/ColorFlash";

function App() {
  return (
    <div className="appLayout">
      <div className="moduleGrid">

        <div className="moduleBox">
          <WireSequences />
        </div>

        <div className="moduleBox">
          <ColorFlash />
        </div>
      </div>
    </div>
  );
}

export default App;
