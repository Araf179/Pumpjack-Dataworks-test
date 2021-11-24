import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';



function StarWarsTable({data}) {
    const [starWarsData, setStarWarsData] = useState([]);
    useEffect(() => {
        if(localStorage.getItem("users")){
            setStarWarsData(JSON.parse(localStorage.getItem("users") || "[]"))
        }else{
            setStarWarsData(data);
        }
    }, [])
    

    const filterName = (e) => {
        const data = [...starWarsData]
        const filtered = data.filter(item => item.name.includes(e.target.value))
        setStarWarsData(filtered);
        if(e.target.value === ''){
            setStarWarsData(JSON.parse(localStorage.getItem("users") || "[]"))
        }
    }
    const columns = [
        {
          field: "action",
          headerName: "Set Favorite",
          sortable: false,
          width: 130,
          renderCell: (params) => {
            const onClick = (e) => {
              e.stopPropagation(); // don't select this row after clicking 
              const newdata = starWarsData.map((item, idx) => {
                if(item.id === params.row.id){
                    item.favorite = !item.favorite;
                    return item;
                }
                return item;
              });
              localStorage.setItem("users", JSON.stringify(newdata));
              setStarWarsData(newdata)
            };
            if (params.row.favorite) {
              const label = { inputProps: { 'aria-label': 'Checkbox' } };
              return <Checkbox onChange={onClick} {...label} defaultChecked />
            }else{
              const label = { inputProps: { 'aria-label': 'Checkbox' } };
              return <Checkbox onChange={onClick} {...label} />
            }
            
          },
        },
        { field: "id", headerName: "ID", width: 130 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "birthYear", headerName: "Birth Year", width: 130 },
        { field: "gender", headerName: "Gender", width: 130 },
        { field: "homeworld", headerName: "Home world", width: 130 },
        { field: "species", headerName: "Species", width: 130 },
        { field: "favorite", headerName: "Is Favorite", width: 130},
      ];
  return (
    <div style={{ marginLeft: '5%', height: 800, width: "90%" }}>
      <TextField id="standard-basic" onChange={(e) => filterName(e)} label="Search" variant="standard" />
      <DataGrid rows={starWarsData} columns={columns} pageSize={10} />
    </div>
  );
}

export default StarWarsTable;
