import React from "react";
import Papa from 'papaparse';

function CreateTable(props){
    const{file} = props;

     const handleClick = () =>{
        //console.log(file);
        Papa.parse(file,{
            download:true,
            worker:true,
            header:false,
            complete:function(results){
                console.log(results); 
                let i = 0;
                results.data.map((data,index)=>{
                    //console.log(data); 
                   if(i===0){
                        let table = document.getElementById('tbl-data');
                        generateTableHead(table,data);
                   }
                   else{
                    let table = document.getElementById('tbl-data');
                    generateTableRows(table,data);
                   }
                   i++;
                });
            }
        });
    }

    function generateTableHead(table,data){
        let thead = table.createTHead();
        let row = thead.insertRow();
        for(let key of data){
            let th = document.createElement('th');
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }

    function generateTableRows(table,data){
        let newRow = table.insertRow();
        data.map((row,index)=>{
            let newCell = newRow.insertCell();
            let newText = document.createTextNode(row);
            newCell.appendChild(newText);
        })
    }

    return(
        <div>
            <button id="btn-upload-csv" className="btn btn-md btn-outline-danger my-2" onClick={handleClick}>Read CSV</button>
            <table id="tbl-data" className="my-3 border border-dark">

            </table>
        </div>
    );
}

export default CreateTable;


