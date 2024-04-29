import './App.css';
import Home from './pages/Home/Home';
import {
    createBrowserRouter, Navigate,
    RouterProvider,
} from "react-router-dom";
import Layout from './layouts/Layout';
import Reviews from './pages/Reviews/Reviews';
import React from 'react';
import Order from "./pages/Order/Order";
import {Purchase} from "./pages/Purchase/Purchase";
import ProductsList from "./pages/ProductsList/ProductsList";
import DetailedProduct from "./pages/ProductsList/DetailedProduct/DetailedProduct";
import Requisite from "./pages/Requisite/Requisite";
import { Comments } from './pages/Comments/Comments';
import CategoriesList from "./pages/CategoriesList/CategoriesList";


function App() {

    const ProtectedRoute = ({children}) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return <Navigate to="/"/>;
        }
        return children
    };


    const routes = [
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/reviews",
                    element: <Reviews/>,
                },
                {
                    path: "/order/info/:id",
                    element: <Order/>,
                },
                {
                    path: "/purchases",
                    element: <Purchase/>
                },
                {
                    path: "/products/list",
                    element: (
                        <ProtectedRoute>
                            <ProductsList/>
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/products/list/:id",
                    element: (
                        <ProtectedRoute>
                            <DetailedProduct/>
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/requisites",
                    element: (
                        <ProtectedRoute>
                            <Requisite />
                        </ProtectedRoute>
                    )
                },
                {
                    path: '/comments',
                    element: (
                        <ProtectedRoute>
                            <Comments />
                        </ProtectedRoute>
                    )
                },
                {
                    path: '/categories/list',
                    element: (
                        <ProtectedRoute>
                            <CategoriesList />
                        </ProtectedRoute>
                    )
                }
            ]
        }
    ]

    const router = createBrowserRouter(routes);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
