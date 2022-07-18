import './App.css';
import { useEffect, useState } from 'react';

const URL = "http://universities.hipolabs.com/search?country=Dominican+Republic";

function App() {

  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredUni, setFilterUni] = useState(data);



  const handlerChange = (e) => {
    setSearchField(e.target.value);
  }
  
  useEffect(()=>{
    fetch(URL)
    .then(resp => resp.json())
    .then(data => {
      setData(data);
    });
    
  }, []);

  useEffect(() => {
    const newFilteredUni = data.filter((uni) => {
      return uni.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterUni(newFilteredUni);
  },[searchField, data]);
  return (
    <div className="App">


    <input className='input' type="search" onChange={handlerChange} placeholder='buscar'/>

    <div className="container">
        {filteredUni ?
          filteredUni.map((uni, idx) => {
            return(
              <div className="uni" key={idx}>
                <img src={`${'https://countryflagsapi.com/png/'+ uni.alpha_two_code}`}/>
                <h2>{uni.name}</h2>
                <p>{uni.country}</p>
              </div>
            )
          })
        :null
        }
    </div>
    </div>
  );
}

export default App;
