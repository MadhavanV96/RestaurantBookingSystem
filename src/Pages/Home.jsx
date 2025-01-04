import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [date, setDate] = useState("");
    
    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    const checkAvailablity=async ()=>{
        try{
            const Response=await axios.post("http://localhost:3001/api/v1/",{"date":date})
            console.log(Response.data);
            // display the result here. For example, display a success message or an error message.
        }
        catch(err){
            console.error("Error:",err);
        }
        
    }


    const checkDate=(e)=>{
        e.preventDefault();
        console.log(date);
        // fetch your API here with date parameter to check availability and display the result.
        checkAvailablity();
    }




  return (
    <div className='flex justify-center'>
        <div>
            <h1>Welcome to Restaurant Booking System</h1>
            <p>Book your table or check availability</p>
            <form onSubmit={checkDate}>
                <input type='date' onChange={handleDateChange} />
                <button type='submit'>Check Availablity</button>
            </form>
            <form className='flex justify-center flex-col items-center'>
                <input type='text' placeholder='Enter your name' />
                <input type='email' placeholder='Enter your email' />
               
                <input type='time' />
                <button>Book Now</button>
            </form>
            
        </div>
    </div>
  )
}

export default Home