import { Client, cacheExchange, fetchExchange } from "urql";
import useAuth from "./useAuth";
import { authExchange } from "@urql/exchange-auth";
import { isLoggedIn } from "../components/Login";
import { Link, Navigate, useNavigate } from "react-router-dom";

const auth = useAuth()

let client: Client | undefined = undefined

const useGraphqlClient = () => {

    if (client === undefined) {
        console.log('grapg client start')
        client = new Client({
            url: 'https://davidhavl2.ngrok.io/graphql',
            exchanges: [cacheExchange,
                //@ts-ignore
                authExchange(async utils => {
                    console.log(auth.getRefreshToken(), 'token')
                    if (auth.getRefreshToken() === undefined) {
                        return
                    } else {
                        await auth.refresh()
                    }

                    let token: string

                    if (auth.getAccessToken() === undefined || auth.getAccessToken() === '') {
                        return
                    } else {

                        token = auth.getAccessToken()
                    }

                    return {
                        addAuthToOperation(operation) {
                            if (token === '' || token === undefined) return operation;
                            return utils.appendHeaders(operation, {
                                Authorization: `Bearer ${token}`,
                            });
                        },
                        async refreshAuth() {
                            console.log('refresh Auth')
                        },
                    };
                }),

                fetchExchange],
            //@ts-ignore
            // fetchOptions: async (e) => {
            //     // console.log(e)
            //     // console.log('pre if', auth.getAccessToken())
            //     if (auth.getAccessToken() === '') {
            //         await auth.refresh()
            //         console.log('if after await refresh')
            //     }
            //     // console.log('after if', auth.getAccessToken())
            //     const token = auth.getAccessToken();
            //     return {
            //         headers: { authorization: token ? `Bearer ${token}` : '' },
            //     };
            // },
        })
    }

    return client
}

export default useGraphqlClient


