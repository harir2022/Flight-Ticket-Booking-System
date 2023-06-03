import React from 'react'
import { Navbar ,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
              Flight Booking System
          </Navbar.Brand>

             <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                      Signed in as: 
                      <Link to ={"/Profile"}/>                                                
              </Navbar.Text>
            </Navbar.Collapse>
        </Container>
      </Navbar> 
  )
}

export default NavBar