import './App.css';
import { Route, Routes } from 'react-router-dom';
import { SignupPage } from './pages/signupPage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import { ForgotPasswordPage } from './pages/forgotPasswordPage.jsx';
import HomePage from './pages/Home page/homePage.jsx';
import PublicLayout from './layouts/publicLayout.jsx';
import UserProfile from './pages/userProfilePage.jsx';
import UserLayout from './layouts/userLayout.jsx';
import { JobPage } from './pages/Job page/jobPage.jsx';
import { PostJobPage } from './pages/Job page/postJobPage.jsx';

function App() {

  return (
   <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      {/* Private/User routes (with shared layout) */}
      {/* <Route path='/me' element={<UserProfile/>} /> */}

   <Route element={<UserLayout />}>
       {/* <Route index element={<UserHome />} /> */}
       <Route path="/jobs" element={<JobPage />} />
       <Route path="/post-job" element={<PostJobPage/>} />
       {/* <Route path="chat" element={<UserChat />} /> */}
       <Route path="/me" element={<UserProfile />} />
       {/* add more sub-routes here */}
    </Route>

    </Routes>
  );
}

export default App
