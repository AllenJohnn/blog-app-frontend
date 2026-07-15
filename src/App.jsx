import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import CreatePost from "./components/CreatePost";
import ViewAll from "./components/ViewAll";
import ViewMyPost from "./components/ViewMyPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes (wrapped in Layout) */}
        <Route element={<Layout />}>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/view-all" element={<ViewAll />} />
          <Route path="/view-my" element={<ViewMyPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
