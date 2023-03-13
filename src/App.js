import React from "react";
import Colors from "./Colors.json";
import "./App.css";
import _ from "lodash";

export default function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredColors, setFilteredColors] = React.useState(Colors);
  

  const handleSearchFilter = (e) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = _.filter(Colors, (color) => {
        return _.includes(
          _.lowerCase(JSON.stringify(_.values(color))),
          _.lowerCase(searchValue)
        );
      });
      setFilteredColors(filter);
    }, 100);
    return () => clearTimeout(timeout);
  }, [searchValue]);
 
  return (
    <div className="App">
      <h1>Color Searcher</h1>

      <input
        type="search"
        placeholder="Search Colors..."
        value={searchValue}
        onChange={handleSearchFilter}
      />

      <tbody>
        <tr>
        <th></th>
          <th>Name</th>
          <th>Hex</th>
        </tr>
     
        {_.map(filteredColors, (color) => (
          <tr key={color.id}>
            <td><input type="color" value={color.hex}/></td> 
            <td> {color.color}</td>
             <td> {color.hex} </td>
             
          </tr>
        ))}
        {filteredColors.length === 0 && <span>No records found to display!</span>}
      </tbody>
        </div>
  );
}

