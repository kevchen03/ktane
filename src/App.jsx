import React from "react";
import "./OriginalApp/styling/commonStyles.css";
import "./App.css";
import WhosOnFirst from "./OriginalApp/components/Original/WhosOnFirst/WhosOnFirst";
import WireSequences from "./OriginalApp/components/Original/WireSequences/WireSequences";
import ColorFlash from "./OriginalApp/components/Centurion/ColorFlash/ColorFlash";

function App() {
  return (
    <div className="appLayout">
      <div className="moduleGrid">
        <div className="moduleBox">
          <WhosOnFirst />
        </div>

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
