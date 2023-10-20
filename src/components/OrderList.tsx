import { gql, useQuery } from "urql";
import Card from "./Card";
import useAuth from "../hooks/useAuth";
import { isLoggedIn, setError } from "./Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAppNotificaions from "../hooks/useAppNotificaions";

const getOrderQuery = gql`
    query {
        ordersByUser {
            orders {
                id
                user {
                    displayname
                }
                city
                province
                totalPrice
                lat
                long
            }
        }
      }
`;

const OrderList = () => {
    // const navigate = useNavigate()
    // const notifications = useAppNotificaions()
    // const auth = useAuth()
    // useEffect(() => {
    //     if (!auth.isLoggedIn()) {
    //         notifications.addError('Please log in');
    //         navigate('/')
    //     }
    //     //@ts-ignore

    // }, [])

    // useQuery hook
    const [result] = useQuery({
        query: getOrderQuery
    });

    // Get data, loading and error states
    const { data, fetching, error } = result;
    console.log(data)
    // Handle loading and error states
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div className="flex flex-col">
            <div className="flex justify-center pt-8">
                <h1 className="text-center pr-2">Search:</h1>
                <div className="relative text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </span>
                    <input type="search" name="q" className="py-2 text-sm text-black bg-zinc-100 rounded-md pl-10 focus:outline-none focus:bg-zinc-800 focus:text-zinc-100" placeholder="Search..." autoComplete="off">
                    </input>
                </div>

            </div>
            <ul>
                {data.ordersByUser.orders.map((e: {
                    totalPrice: any;
                    city: string;
                    province: string; id: string; user: { displayname: string; }
                }) => (
                    <li key={e.id}>
                        <Card id={e.id} user={{
                            displayname: e.user.displayname
                        }} city={e.city} province={e.province} price={e.totalPrice} />
                    </li>
                ))}
            </ul>
            {/* <span>{data.ordersByUser.orders[0].id}</span> */}

        </div>

    )
}

export default OrderList

