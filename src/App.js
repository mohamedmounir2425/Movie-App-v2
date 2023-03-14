
import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import About from './components/About/About';
import SystemLayout from './Layout/AuthLayout';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserLayout from './Layout/UserLayout';
import Movies from './components/Movies/Movies';
import Tv from './components/Tv/Tv';
import People from './components/People/People';
import Network from './components/Network/Network';
import { Offline, Online } from "react-detect-offline";
import '@fortawesome/fontawesome-free/css/all.min.css'
import MovieDetails from './components/MovieDetails/MovieDetails';
import AuthLayout from './Layout/AuthLayout';
import jwtDecode from 'jwt-decode';




const routes = createBrowserRouter([
  {
    path: '/', element: <UserLayout />, children: [
      {
        index: true, element: <Home />,
      },
      { path: 'home', element: <Home /> },
      { path: 'movies', element: <Movies /> },
      { path: 'tv', element: <Tv /> },
      { path: 'people', element: <People /> },
      { path: 'about', element: <About /> },
      { path: 'network', element: <Network /> },
      { path: 'products', element: <Products /> },
      { path: 'details/:id/:media', element: <MovieDetails /> },
      { path: '*', element: <NotFound /> },

    ]
  },{
    path: '/', element: <AuthLayout />, children: [
      {
        index: true, element: <Login />},
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },  

    ]
  }



])

function App() {




  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
