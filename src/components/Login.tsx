import { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import Notifications from './Notifications'

let logged = false
let error = false


const Login = () => {
    const auth = useAuth()
    const userRef = useRef(null)
    const navigate = useNavigate()


    const [user, setUser] = useState('test@havl.net')
    const [pwd, setPwd] = useState('Ble_123_ble')

    useEffect(() => {
        //@ts-ignore
        userRef.current.focus()
        logged = false
    }, [])

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const response = await fetch('https://davidhavl2.ngrok.io/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.toString(), password: pwd.toString() })
            })
            const result = await response.json()

            console.log(result)


            if (result.refreshToken !== undefined) {
                auth.setRefreshToken(result.refreshToken)
                logged = true
                navigate('/orders')
            }

            console.log(user, pwd)
        } catch (err) {
            error = true
            logged = false
            console.log('error', err)
        }
    }

    return (
        <div className='h-screen w-screen bg-zinc-100 flex justify-center py-10'>

            <Notifications />
            <div className='text-center border-2 border-white rounded-[20px] px-8 pt-4 bg-zinc-400 h-96 w-80'>
                <h1 className='bg-gradient-to-r from-blue-800 from-40% to-yellow-400 inline-block text-transparent bg-clip-text text-6xl pb-1'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p className='text-yellow-400 text-2xl py-6'>Username</p>
                        <input
                            className='bg-zinc-200 text-blue-800 rounded-md px-2'
                            type="text"
                            id='username'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => { setUser(e.target.value) }}
                            value={user}
                            required />
                    </label>
                    <label>
                        <p className='text-blue-800 text-2xl py-6'>Password</p>
                        <input
                            className='bg-zinc-200 text-yellow-500 rounded-md px-2'
                            type="password"
                            id='password'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => { setPwd(e.target.value) }}
                            value={pwd}
                            required />
                    </label>
                    <div>
                        <button className="mt-6 bg-zinc-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export function isLoggedIn() {
    return logged
}

export function setError(value: boolean = false) {
    error = value
}

export default Login