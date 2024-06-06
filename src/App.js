import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/articles" element={<PrivateRoute><Articles /></PrivateRoute>} />
          <Route path="/articles/:id" element={<PrivateRoute><SingleArticle /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
