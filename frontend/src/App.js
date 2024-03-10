import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { Header, Footer } from './layout/_layout_index'
import { Admin, Loading, Error, Users, Dashboard, Home, Login, Evaluations} from "./pages/_page_index";
import './App.css';
import { UserForm, UserContext, EvaluationForm } from "./components/_component_index";

function App() {
  const [user, setUser] = useState(null);
  return (
      <UserContext.Provider value={{user, setUser}}>
        <Router>
          <div className="App">
            <Header />
            <div className="page-content">
              <Container>
                <Routes>
                  <Route>
                    <Route path="/" element={<Home />}/>
                    <Route path="/users" element={<Users />}/>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/admin" element={<Admin />}/>

                    <Route path="/evaluations" element={<Evaluations />} />
                    <Route path="/user" element={<Users />}/>

                    <Route path="/evaluationform" element={<EvaluationForm newEvaluation />} />
                    <Route path="/editevaluationform/:id" element={<EvaluationForm />} />

                    <Route path="/userform" element={<UserForm newUser />}/>
                    <Route path="/edituser/:id" element={<UserForm />}/>
                  </Route>
                  <Route path="/login" element={<Login />}/>
                  <Route path="*" element={<Error />}/>
                  <Route path="/loading" element={<Loading />}/>

                </Routes>
              </Container>
            </div>
            <Footer />
          </div>
        </Router>
      </UserContext.Provider>
  );
}

export default App;
