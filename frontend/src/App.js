import { useState, useEffect } from "react";
import cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { Header, Footer } from './layout/_layout_index'
import { Admin, Loading, Error, Users, Dashboard, Home, Login, Evaluations} from "./pages/_page_index";
import './App.css';
import { UserContext, PrivateRoutes, UserForm, EvaluationForm, AnnouncementForm } from "./components/_component_index";
import Announcements from "./pages/Announcements";

function App() {
  const [user, setUser] = useState(null);
  const userCookie = cookies.get("userCookie");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`http://localhost:8000/api/user/user/${userCookie}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const _response = await response.json();
      if(!response.ok) {
        console.log(_response.error);
      }
      if(response.ok) {
        setUser(_response.user);
      }
      setLoading(false);

    }
    if(userCookie) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  if(loading) {
    return <Loading />;
  }


  return (
      <UserContext.Provider value={{user, setUser}}>
        <Router>
          <div className="App">
            <Header />
            <div className="page-content">
              <Container>
                <Routes>
                  <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/users" element={<Users />}/>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/admin" element={<Admin />}/>

                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/evaluations" element={<Evaluations />} />
                    <Route path="/user" element={<Users />}/>

                    <Route path="/announcementform" element={<AnnouncementForm newAnnouncement />} />
                    <Route path="/editannouncementform/:id" element={<AnnouncementForm />} />

                    <Route path="/evaluationform" element={<EvaluationForm newEvaluation />} />
                    <Route path="/editevaluationform/:id" element={<EvaluationForm />} />

                    <Route path="/userform" element={<UserForm newUser />}/>
                    <Route path="/edituser/:id" element={<UserForm />}/>
                  </Route>
                  <Route path="/login" element={user ? <Navigate to="/"/>  : <Login />}/>
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
