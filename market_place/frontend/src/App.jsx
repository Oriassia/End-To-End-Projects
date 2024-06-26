import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import HomePage from "./components/app/HomePage";
import AddProduct from "./components/app/AddProduct";
import ProductDetails from "./components/app/ProductDetails";
import Footer from "./components/app/Footer";
import NavBar from "./components/app/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-Product" element={<AddProduct />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
