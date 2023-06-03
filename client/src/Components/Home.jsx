import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

import axios from 'axios'

const displayFlights = (flights)=>{
  
  useEffect(()=>{

  },[flights])
    return(
    <div className='bg-success'>
    {
      flights.map((flight)=>(
        <>
        <h1 className='text-light'>
            {flight.airline}
            {flight._id}
        </h1>
        </>
      ))
    }
    </div>)
}


function Home() {



  const [showFlights, setShowFlights] = useState(false)
  const [data, setData] = useState({
    from: '',
    to: '',
    date: new Date(),
    seats:0,
    class: '',
  })

  const [flights,setFlights] = useState();

  const fetchflights=async () =>{
    async() => {
      const departureCity = data.from ;
      const destinationCity = data.to;
      const departureDate = data.date ;
      const availableSeats = data.seats;
      
      const baseurl="http://localhost:3000/api/v1/flights"
      // let queryParams = "";
      // if (departureCity) {
      //   queryParams += `departureCity=${departureCity}&`;
      // }    
      // if (destinationCity) {
      //   queryParams += `destinationCity=${destinationCity}&`;
      // }    
      // if (departureDate) {
      //   queryParams += `departureDate[gte]=${departureDate}&`;
      // }    
      // if (availableSeats) {
      //   queryParams += `availableSeats[gte]=${availableSeats}&`;
      // }    
      // if (queryParams.endsWith("&")) {
      //   queryParams = queryParams.slice(0, -1);
      // }
      
      const url = `${baseurl}`;
  
      let {data :d} = await axios.get(url);
      setFlights(d);
      setShowFlights(true)
      return d;
  }
  useEffect(
  ()=>{
    fetchflights();
  }
  , [showFlights])
  

  const handleSubmit =async(e)=>{
    e.preventDefault();   
    setShowFlights(true)
  }

  
  return (
     <Container  fluid className='bg-dark text-white p-5'>
              <Container>
              <Row >
              <Form onSubmit={handleSubmit}>
                    <Row>
                            <Col xs={12} md={3}>
                                        <Form.Control placeholder="From" onChange={(e)=>{
                                            setData({
                                              ...data,
                                              from: e.target.value
                                            })
                                        }}/>
                              </Col>
                              <Col xs={6} md={3}>
                                         <Form.Control placeholder="To" onChange={(e)=>{
                                            setData({
                                              ...data,
                                              to: e.target.value
                                            })
                                        }}/>
                              </Col>
                            <Col xs={12} md={2}>
                                         <Form.Control placeholder="Depart Date" type="date" onChange={(e)=>{
                                            setData({
                                              ...data,
                                              date: e.target.value
                                            })
                                        }}/>
                              </Col>
                              <Col xs={6} md={2}>
                                         <Form.Control placeholder="Required Seats " onChange={(e)=>{
                                            setData({
                                              ...data,
                                              seats: e.target.value
                                            })
                                        }}/>
                              </Col>
                          
                              <Col xs={6} md={2}>
                                         <Button type='Submit'  className='btn-dark text-light border-light' >Submit</Button>
                              </Col>                         
                    </Row>
              </Form>
              </Row>
              </Container>
              <Row>
              <h1>Flights</h1>
                      { showFlights ?(<displayFlights  flights={flights}/>):<h1>No FLights</h1>
                      }

              </Row>
     </Container>
  )}
}

export default Home;