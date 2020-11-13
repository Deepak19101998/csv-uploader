import { useRef } from "react";

function DragAndDrop(props) {
  const { data, dispatch } = props;
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    if (files && files.length === 1 && checkExtension(files)) {
      const file = files[0];
      dispatch({ type: "ADD_FILE", file });
      e.dataTransfer.clearData();
      dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  const handleClickEvent = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const checkExtension = (files) =>{
    const fileName = files[0].name.toLowerCase();
    const extensionOfFile = fileName.split('.').pop();
    if(extensionOfFile==='csv'){
        return true;
    }
    else
        return false;
  }

  const handleFileUpload = (event) => {
    event.stopPropagation();
    const file = event.target.files[0];
    dispatch({ type: "ADD_FILE", file });
  };

  return (
    <div
      className={
        data.inDropZone ? "drag-drop-zone inside-drag-area" : "drag-drop-zone"
      }
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onClick={(e) => handleClickEvent(e)}
    >
      <input
        type="file"
        id="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".csv"
        onChange={(event) => handleFileUpload(event)}
      />
      <p>Drag file here to upload <br/>
          Or click here to select file
      </p>
      {data.file === "" ? <p>No File Found</p> : <p>{data.file.name}</p>}
    </div>
  );
}

export default DragAndDrop;

