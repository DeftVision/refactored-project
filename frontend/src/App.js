import {useState, useEffect} from "react";
import cookies from 'js-cookie';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap';
import {Header, Footer} from './layout/index'
import {Announcements, AnnouncementData, AnnouncementForm} from './announcement/index';
import {Admin, AdminDefault} from './admin/index';
import {UserForm, UserData, Login, Users, ForgotPassword, Profile, ResetPassword, LoginHelp} from './auth/index'
import {TestPage, TestForm} from './test/index';

import {
    EvaluationData,
    EvaluationDefault,
    EvaluationDetails,
    EvaluationForm,
    Evaluations,
    DetailsPage
} from './evaluation/index';
import {DocumentData, DocumentForm, Documents} from './document/index'
import {Dashboard} from "./dashboard/index";
import {Loading, Error, Home,} from "./pages/index";
import {UserContext, PrivateRoutes, Notification, firebase} from "./components/index";


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
            if (!response.ok) {
                console.log(_response.error);
            }
            if (response.ok) {
                setUser(_response.user);
            }
            setLoading(false);
        }

        if (userCookie) {
            getUser();
        } else {
            setLoading(false);
        }
    }, []);
    if (loading) {
        return <Loading/>;
    }
    return (
        <UserContext.Provider value={{user, setUser}}>
            <Router>
                <div className="App">
                    <Header/>
                    <div className="page-content">
                        <Container>
                            <Routes>
                                <Route element={<PrivateRoutes/>}>
                                    <Route path="/" element={<Home/>}/>

                                    <Route path="/admin" element={<Admin/>}/>
                                    <Route path="/admindefault" element={<AdminDefault/>}/>

                                    <Route path="/announcements" element={<Announcements/>}/>
                                    <Route path="/announcementform" element={<AnnouncementForm newAnnouncement/>}/>
                                    <Route path="/announcementdata" element={<AnnouncementData/>}/>
                                    <Route path="/editannouncement/:id" element={<AnnouncementForm/>}/>

                                    <Route path="/dashboard" element={<Dashboard/>}/>

                                    <Route path="/documents" element={<Documents/>}/>
                                    <Route path="/documentdata" element={<DocumentData/>}/>
                                    <Route path="/documentform" element={<DocumentForm newDocument/>}/>
                                    <Route path="/editdocument/:id" element={<DocumentForm/>}/>

                                    <Route path="/evaluations" element={<Evaluations/>}/>
                                    <Route path="/evaluationdefault" element={<EvaluationDefault/>}/>
                                    <Route path="/details" element={<DetailsPage/>}/>
                                    <Route path="/evaluationform" element={<EvaluationForm newEvaluation/>}/>
                                    <Route path="/editevaluation/:id" element={<EvaluationForm/>}/>
                                    <Route path="/evaluationdata" element={<EvaluationData/>}/>
                                    <Route path="/evaluationdetails/:id" element={<EvaluationDetails/>}/>

                                    <Route path="/users" element={<Users/>}/>
                                    <Route path="/userform" element={<UserForm newUser/>}/>
                                    <Route path="/edituser/:id" element={<UserForm/>}/>
                                    <Route path="/userdata" element={<UserData/>}/>
                                    <Route path="/resetpassword/:id" element={<ResetPassword/>}/>
                                    <Route path="/profile" element={<Profile/>}/>


                                    <Route path="/test" element={<TestPage/>}/>
                                    <Route path="/testForm" element={<TestForm/>}/>
                                </Route>
                                <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
                                <Route path="*" element={<Error/>}/>
                                <Route path="/loading" element={<Loading/>}/>
                                <Route path="/notification" element={<Notification/>}/>
                                <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                                <Route path="/loginhelp" element={<LoginHelp/>}/>


                            </Routes>
                        </Container>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
