import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Taskpage from "./Taskpage";
import Dashboard from "./Dashboard";
import Taskstatus from "./Taskstatus";
import Webcode from "./Webcode";
import Portal from "./Portal";

import Loginpage from "./Loginpage";
import Signup from "./Signup";
import Signuppage from "./Signuppage";
import Routeprotection from "./Routeprotection";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:email/signUpPage" element={<Signuppage />} />
        <Route path="/portal" element={<Portal />}>
          <Route
            path="/portal"
            element={
              <Routeprotection>
                <Home />
              </Routeprotection>
            }
          />
          <Route path="/portal/:Task" element={<Taskpage />} />
          <Route path="/portal/Dashboard" element={<Dashboard />} />
          <Route path="/portal/Task Status" element={<Taskstatus />} />
          <Route path="/portal/Web code" element={<Webcode />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
