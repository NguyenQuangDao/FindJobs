import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Login from "./components/Auth/Login/Login";

import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Cta from "./components/Cta/Cta";
import FeaturedJobs from "./components/FeaturedJobs/FeaturedJobs";
import Home from "./components/Home/Home";
import LatestJobs from "./components/LatestJobs/LatestJobs";
import PageNotFount from "./components/PageNotFount/PageNotFount";
// smooth scrolling
import Lenis from "lenis";
import Register from './components/Auth/Register/Register';

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

export const MainLayout = () => (
  <>
    <Home />
    <Brands />
    <Categories />
    <Cta />
    <FeaturedJobs />
    <LatestJobs />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<MainLayout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<PageNotFount />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
