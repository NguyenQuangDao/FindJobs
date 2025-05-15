import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";

import Lenis from "lenis";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Cta from "./components/Cta/Cta";
import FeaturedJobs from "./components/FeaturedJobs/FeaturedJobs";
import Home from "./components/Home/Home";
import JobListMain from "./components/JobListings/JobListMain";
import LatestJobs from "./components/LatestJobs/LatestJobs";
import PageNotFount from "./components/PageNotFount/PageNotFount";
import Profile from "./components/Profile/Profile";
import Layout from "./Layout";
// smooth scrolling
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
      <Route path="/jobListMain" element={<JobListMain />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/jobForm" element={<JobForm />} />
      <Route path="*" element={<PageNotFount />} />
    </Route>
  )
);

import { AppProvider } from "./AppProvider/AppProvider";
import JobForm from "./components/JobForm/JobForm";
import { CommonMessageProvider } from "./shared/CommonMessage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CommonMessageProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </CommonMessageProvider>
  </StrictMode>
);
