import "./App.css";
import Table from "./components/Table";
import HeaderButton from "./components/HeaderButton";
import Form from "./components/Form";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeaderButton />
                <Table />
              </>
            }
          />
          <Route path="/createUser" element={<Form/>}/>
          <Route path="/editUser/:id" element={<Form/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
