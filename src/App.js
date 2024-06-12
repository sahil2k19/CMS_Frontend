import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import PublicRoute from "./components/PublicRoute";
import MainDashboard from "./components/MainDashboard";
import ShowAllArticles from "./components/ShowAllArticles";
import CreateNewArticle from "./components/CreateNewArticle";
import Layout from "./components/Layout";
import PublicArticle from "./components/PublicArticle";
import SinglePublicArticle from "./components/SinglePublicArticle";

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<PublicArticle />} />
          <Route path="/dashboard" element={<PrivateRoute><MainDashboard /></PrivateRoute>} />
          <Route path="/allArticles" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/articles" element={<PrivateRoute><Articles /></PrivateRoute>} />
          <Route path="/articles/:id" element={<PrivateRoute><CreateNewArticle /></PrivateRoute>} />
          <Route path="/articles/all" element={<PrivateRoute><ShowAllArticles /></PrivateRoute>} />
          <Route path="/createArticle" element={<PrivateRoute><CreateNewArticle /></PrivateRoute>} />
          <Route path="/public/article/:id" element={<SinglePublicArticle />} />

        </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
