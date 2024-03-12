// This makes VSCode check types as if you are using TypeScript
//@ts-check
import React from 'react'
import { useState, useEffect } from 'react'
import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import Accommodations from './getAccommodations'
import Account from './accountsList'
import Packing from './getPackingList'
import Login from './login'
import Budget from './getBudget'



// All your environment variables in vite are in this object
console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST
const API_URL = import.meta.env.VITE_API_URL

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

// /**
//  * This is an example of using JSDOC to define types for your component
//  * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
//  * @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
//  *
//  * @returns {React.ReactNode}
//  */
// function App() {
//     // Replace this App component with your own.
//     /** @type {[LaunchInfo | undefined, (info: LaunchInfo) => void]} */
//     const [launchInfo, setLaunchInfo] = useState()
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         async function getData() {
//             let url = `${API_HOST}/api/launch-details`
//             console.log('fastapi url: ', url)
//             let response = await fetch(url)
//             /** @type {LaunchData} */
//             let data = await response.json()

//             if (response.ok) {
//                 if (!data.launch_details) {
//                     console.log('drat! no launch data')
//                     setError('No launch data')
//                     return
//                 }
//                 console.log('got launch data!')
//                 setLaunchInfo(data.launch_details)
//             } else {
//                 console.log('drat! something happened')
//                 setError(data.message)
//             }
//         }
//         getData()
//     }, [])

    return (
        // <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/api/accommodations"
                        element={<Accommodations />}
                    />
                    <Route
                        path="/api/accounts"
                        element={<Account />}
                    />
                    <Route
                        path="/api/packing_list"
                        element={<Packing />}
                    />
                    <Route
                        path="/api/budgets"
                        element={<Budget />}
                    />
                </Routes>
            </Router>
        //  </AuthProvider>
    )
}

export default App;
