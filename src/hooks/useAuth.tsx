import { useState } from "react"

const state = {
    refreshToken: '',
    accessToken: ''
}

const useAuth = () => {

    const refresh = async () => {
        console.log('refresh called')
        const response = await fetch('https://davidhavl2.ngrok.io/auth/refresh', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ auth_refresh_token: state.refreshToken })
        })
        const result = await response.json()


        state.refreshToken = result.refreshToken
        state.accessToken = result.accessToken
    }

    const setRefreshToken = (value: string) => {
        state.refreshToken = value
    }

    const getRefreshToken = () => {
        return state.refreshToken
    }

    const getAccessToken = () => {
        return state.accessToken
    }

    const isLoggedIn = () => {
        console.log('loggedin', state.refreshToken !== '', state.refreshToken!!)
        //TODO: replace with state.refreshToken!!
        return state.refreshToken !== ''
    }

    return { refresh, setRefreshToken, getAccessToken, getRefreshToken, isLoggedIn }
}

export default useAuth