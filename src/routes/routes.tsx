import { LoaderFunctionArgs, createBrowserRouter, redirect } from "react-router-dom";
import Login from "../components/Login";
import OrderList from "../components/OrderList";
import useAuth from "../hooks/useAuth";

const router = createBrowserRouter([
    { id: 'root', path: '/', element: <Login />, children: [{ path: 'orders', loader: protectedLoader, Component: OrderList }] },
    // {
    //     path: '/orders', loader() {
    //         return { auth: useAuth().isLoggedIn }
    //     }, element: <OrderList />
    // },
])

function protectedLoader({ request }: LoaderFunctionArgs) {
    // If the user is not logged in and tries to access `/protected`, we redirect
    // them to `/login` with a `from` parameter that allows login to redirect back
    // to this page upon successful authentication
    if (!useAuth().isLoggedIn()) {
        let params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect("/");
    }
    return null;
}

export default router