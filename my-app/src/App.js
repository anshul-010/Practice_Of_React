import react, { useEffect, useState } from 'react'; 
import './App.css';

const firstObj = {
  name:"",
  age:"",
  rollno:"",
  image:""
}

function App() {
  const [intialData,setIntialData] = useState(firstObj)
  const [Data,setData] = useState([])
  const [filter,setFilter] = useState("")

  function handleChange(event){
    // console.log(event.target.value)
    setIntialData({...intialData,[event.target.name]: event.target.value})
    console.log(intialData)
  }

  function submitForm(e){
    e.preventDefault()
    console.log(intialData)
     fetch("http://localhost:8080/data",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(intialData)
    })
    .then((res)=>{
      return res.json()
    })
    .then((dat)=>{
      fetchData()
    })
    .catch((err)=>{
      console.log(err)
    })
    // console.log(intialData)

  }
  function fetchData(){
    fetch("http://localhost:8080/data")
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      setData(data)
    })
  }
  useEffect(()=>{
    fetchData()
  },[])

  function filterData(){
    fetch(`http://localhost:8080/data?name=Anshul`)
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      setData(data)
    })
  }
  return (
    <div>
      <div className="App">
      <h2>Fill the Form</h2>
      <form onSubmit={submitForm}>
        <label>
          name:<input type='text' name='name' onChange={handleChange}/>
        </label>
        <label>
          age:<input type='text' name='age' onChange={handleChange} />
        </label>
        <label>
          rollno:<input type='text' name='rollno' onChange={handleChange} />
        </label>
        <label>
          image:<input type='text' name='image' onChange={handleChange} />
        </label>
        <button type='submit'>submit</button>
      </form>
      
      </div>
      <label>short by Name:
        <input type='checkbox' name='Name' onChange={filterData}/>
      </label>
      <div>
        <h2>User Data</h2>
        {Data.map((item)=>{
          return <div style={{border:"1px solid", margin:"5px", width:"150px"}}>
            <img src={item.image} alt='image_Error' width={150} height={220}/>
            <p>Name: {item.name}</p>
            <h3>Rollno. {item.rollno}</h3>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
