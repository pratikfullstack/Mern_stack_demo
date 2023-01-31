import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';
import User from './components/User';
import AddEdit from './components/User/AddEdit';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar bg="light">
        <Container>
            <Navbar.Brand>MERN Demo</Navbar.Brand>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
                <User />
            }
          />
          <Route
            exact
            path="/add"
            element={
              <AddEdit />
            }
          />
          <Route
            exact
            path="/edit"
            element={
              <AddEdit />
            }
          />
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
