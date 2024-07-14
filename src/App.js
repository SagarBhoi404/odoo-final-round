import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from './components/inc/Navbar'
import Login from "./components/pages/Login";

import Admindashboard from "./components/Admin/Admindashboard";
import ManageLabrarian from "./components/Admin/ManageLabrarian";
// import Admindashboard from "./components/Admin/ManageLabrarian";
import ViewLibrarian from "./components/Librarian/ViewLibrarian";

import BookManagement from "./components/Librarian/BookManagement";
import ListUser from "./components/Librarian/ListUser";
import UserBorrow from "./components/Librarian/UserBorrow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
       
  

{/* Admin Routes */}
        <Route path="/Admin/Admindashboard" element={<Admindashboard />} />
        <Route path="/Admin/ManageLabrarian" element={<ManageLabrarian />} />
        <Route path="/Admin/ViewLibrarian" element={<ViewLibrarian />} />

{/* Librarian Routes */}

        <Route
          path="/Librarian/Librariandashboard"
          element={<Librariandashboard />}
        />
        <Route
          path="/Librarian/BookManagement"
          element={<BookManagement/>}
        />
        <Route
          path="/Librarian/ListUser"
          element={<ListUser/>}
        />
        <Route
          path="/Librarian/UserBorrow"
          element={<UserBorrow/>}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
