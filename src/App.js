import { useReducer } from "react";
import "./App.css";
import CreateTable from "./Components/CreateTable";
import DragAndDrop from "./Components/DragAndDrop";

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE":
        return { ...state, file: action.file };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    file: "",
  });

  return (
    <div className="App">
      <h1>CSV File Uploader</h1>
      <DragAndDrop data={data} dispatch={dispatch} />
      {/* {data.file !== "" && <button className="continue-button">Proceed</button>} */}
      <CreateTable file={data.file}/>
    </div>
  );
}

export default App;