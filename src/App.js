import { useEffect, useState } from "react";
import { client } from "./config/Apollo";
import { gql } from "@apollo/client";
import StarWarsTable from './components/StarWarsCharacaterTable';

function App() {
  const [starWarChars, setStarWarsChar] = useState([]);

  useEffect(() => {
    (async function () {
      const starWarCharactars = await client.query({
        query: gql`
          query GetAllData {
            allPeople {
              people {
                id
                name
                birthYear
                gender
                homeworld {
                  id
                  name
                }
                species {
                  id
                  name
                }
              }
            }
          }
        `,
      });
      const array = [...starWarCharactars.data.allPeople.people];
      array.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      let tableData = [];
      array.map((item, idx) => {
        tableData.push({
          id: item.id,
          name: item.name,
          birthYear: item.birthYear,
          gender: item.gender,
          homeworld: item.homeworld.name,
          species: item.species === null ? 'no species': item.species?.name ,
          favorite: false
        });
      });
      setStarWarsChar(tableData);
    })();
  }, []);

  return (
    <div className="App">
      <StarWarsTable data={starWarChars}/>
    </div>
  );
}

export default App;
