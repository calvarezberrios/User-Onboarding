import React from 'react';
import './App.css';
import Form from "./components/Form";
import { Navbar, NavbarBrand } from 'reactstrap';

function App() {
  return (
    <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Advanced Form Management Project</NavbarBrand>
        </Navbar>

        <Form />
      
    </div>
  );
}

export default App;
