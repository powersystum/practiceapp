import 'bootstrap/dist/css/bootstrap.min.css';
import{useEffect, useState} from 'react'
import './App.css';

function App() {
  const [data,setData]=useState([]);
  const [getCountry,setGetCountry]=useState();
  const [getState,setGetState]=useState([]);
  const [stdata,setstdata]=useState();
  const [cities,setCities]=useState([]);

 
  //const [getcountry,setGetcontry]=useState('');
  //const [stateData,setStateData]=useState([]);
  //const [stateId,setStateId]=useState('');
  useEffect(()=>{
    fetch ("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json").then((result)=>{
      result.json().then((resp)=>{
        //console.log("result",resp);
        setData(resp);
      })
    })

  },[])
  
  const country =[...new Set(data.map(items=> items.country))];
  //console.log(country);
  country.sort();

  const handleCountry=(e)=>{
    let states = data.filter(state =>state.country === e.target.value);
   // console.log(states);
    states =[...new Set(states.map(item=>item.subcountry))]
    states.sort();
   // console.log(states);

    setGetState(states);
    
  }
  const handleState=(e)=>{
   let cities = data.filter(city=>city.subcountry === e.target.value);
   console.log(cities);
   setCities(cities);
  }

  return (
    <div  className='justify-content-center d-flex w-100 vh-100 bg-dark text-white'>
      <div className='w-50 mt-5'>
     <h2 className="text-center" style={{color:'white'}}>Select Contry and Cities</h2> 
     <select className='form-control ' onChange={(e)=>handleCountry(e)}>
      <option>--Country--</option>
      <option>select Country</option>

      {country.map(items=> <option key={items} value={getCountry} >{items}</option>)}
     </select>
     <br/>
     <select className='form-control' onChange={handleState}>
      <option >--States--</option>
      <option >select States</option>

      {getState.map(items=><option key={items} value={stdata}>{items}</option>)}
     </select>
     <br/>
     <select className='form-control'>
      <option>--City--</option>
      <option>select city</option>
       {cities.map(items=><option key={items.name}>{items.name}</option>)}
     </select>
    
      </div>
    </div>
  );
}

export default App;
