// modules
import React from "react";

// components
import { FirstTask } from "../../components/FirstTask";
import { SecondTask } from "../../components/SecondTask";
import { Popup } from "../../components/Popup";

// redux
import { useAppSelector } from "../../redux/store";


// main code

const App: React.FC = () => {

	const isPopup = useAppSelector(state => state.popupReducer.popup.isPopup)

  return <div className="app">
    <ul
      style={{ filter: isPopup ? "blur(4px)" : "none", margin: "20px" }}
    >
      <li>
        <FirstTask/>
      </li>
      <li>
        <SecondTask/>
      </li>
    </ul>

    {
      isPopup && <Popup />
    }
    
  </div>
};

export { App };