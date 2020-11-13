import React from "react";
import Papa from "papaparse";

function CreateTable(props) {
  const { file } = props;
  let jsonData = [];

  const handleClick = () => {
    //console.log(file);
    Papa.parse(file, {
      download: true,
      worker: true,
      header: false,
      complete: function (results) {
        // console.log(results);
        let i = 0;
        results.data.map((data, index) => {
          //console.log(data);
          if (i === 0) {
            let table = document.getElementById("tbl-data");
            generateTableHead(table, data);
          } else {
            let table = document.getElementById("tbl-data");
            generateTableRows(table, data);
          }
          i++;
        });
      },
    });
  };

  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  function generateTableRows(table, data) {
    let newRow = table.insertRow();
    data.map((row, index) => {
      let newCell = newRow.insertCell();
      let newText = document.createTextNode(row);
      newCell.appendChild(newText);
    });
  }

  const handleClickJSON = () => {
    Papa.parse(file, {
      worker: true,
      header: true,
      complete: function (results) {
        console.log("Row:", results.data);
        jsonData = results.data;

        const element = document.createElement("a");
        const json = JSON.stringify(jsonData);
        const file = new Blob([json], { type: "text/json" });
        element.href = URL.createObjectURL(file);
        element.download = "json_data.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      },
    });
  };

  return (
    <div>
      <button id="btn-upload-csv" className="btn btn-md btn-outline-danger my-2" onClick={handleClick}>
        Read CSV
      </button>
      <button id="btn-upload-json" className="btn btn-md btn-outline-danger m-2" onClick={handleClickJSON}>
        Download JSON
      </button>
      <table id="tbl-data" className="my-3 border border-dark"></table>
      {jsonData.length > 0 && <p>{jsonData.length}</p>}
    </div>
  );
}

export default CreateTable;

// import React from "react";
// import Papa from 'papaparse';

// function CreateTable(props){
//     const{file} = props;

//      const handleClick = () =>{
//         //console.log(file);
//         Papa.parse(file,{
//             download:true,
//             worker:true,
//             header:false,
//             complete:function(results){
//                 console.log(results); 
//                 let i = 0;
//                 results.data.map((data,index)=>{
//                     //console.log(data); 
//                    if(i===0){
//                         let table = document.getElementById('tbl-data');
//                         generateTableHead(table,data);
//                    }
//                    else{
//                     let table = document.getElementById('tbl-data');
//                     generateTableRows(table,data);
//                    }
//                    i++;
//                 });
//             }
//         });
//     }

//     function generateTableHead(table,data){
//         let thead = table.createTHead();
//         let row = thead.insertRow();
//         for(let key of data){
//             let th = document.createElement('th');
//             let text = document.createTextNode(key);
//             th.appendChild(text);
//             row.appendChild(th);
//         }
//     }

//     function generateTableRows(table,data){
//         let newRow = table.insertRow();
//         data.map((row,index)=>{
//             let newCell = newRow.insertCell();
//             let newText = document.createTextNode(row);
//             newCell.appendChild(newText);
//         })
//     }

//     return(
//         <div>
//             <button id="btn-upload-csv" className="btn btn-md btn-outline-danger my-2" onClick={handleClick}>Read CSV</button>
//             <table id="tbl-data" className="my-3 border border-dark">

//             </table>
//         </div>
//     );
// }

// export default CreateTable;


