import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
  import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
  import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
  import Login from './pages/Login';
  import Signup from './pages/Signup';
  import Home from "./pages/Home";
  import { CartProvider } from "./components/ContextReducer";
  import MyOrder from "./pages/MyOrder";
  
  function App() {
    return (
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/myOrder" element={<MyOrder />} />
            </Routes>
          </div>
  
        </Router>
      </CartProvider>
    );
  }
  
  export default App;  