import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap-grid.css'
import { Container } from 'react-bootstrap';
import { Admin, Loading, Error, Users, Dashboard, Home, Login} from "./pages/_page_index";
import './App.css';
import UserContext from "./components/UserContext";
import { UserForm} from "./components/_component_index";

function App() {
  const [user, setUser] = useState(null);
  return (
      <UserContext.Provider value={{user, setUser}}>
        <Router>
          <div className="App">
            <div className="page-content">
              <Container>
                <Routes>
                  <Route path="/loading" element={<Loading />}/>
                  <Route path="/" element={<Home />}/>
                  <Route path="*" element={<Error />}/>
                  <Route path="/users" element={<Users />}/>
                  <Route path="dashboard" element={<Dashboard />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/admin" element={<Admin />}/>
                  <Route path="/newuser" element={<UserForm />}/>

                </Routes>
              </Container>
            </div>
          </div>
        </Router>
      </UserContext.Provider>
  );
}

export default App;
