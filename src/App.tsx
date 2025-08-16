import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import TaskDetail from "./pages/TaskDetail";

const { Header, Content } = Layout;

function App() {

  
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ background: "#1677ff", padding: "0 20px" }}>
          <Navbar />
        </Header>

        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
