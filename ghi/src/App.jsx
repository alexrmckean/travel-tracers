// This makes VSCode check types as if you are using TypeScript
//@ts-check
import { useParams } from 'react-router-dom'
import React from 'react'
import { useState, useEffect } from 'react'
import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import Accommodations from './Accommodations/AccommodationsList'
import Packing from './Packing/PackingList'
import PackingListForm from './Packing/CreatePackingListForm'
import Login from './Account/LoginPage'
import Budget from './Budget/BudgetList'
import SignUp from './Account/SignUpPage'
import Nav from './Components/Nav'
import Itinerary from './Itinerary/ItineraryList'
import BudgetForm from './Budget/CreateBudgetForm'
import ItineraryForm from './Itinerary/CreateItineraryForm'
import EditBudgetForm from './Budget/EditBudgetForm'
import EditItineraryForm from './Itinerary/EditItineraryForm';
import BudgetDetails from './Budget/BudgetDetails';
import ItineraryDetails from './Itinerary/ItineraryDetails';
import AccommodationForm from './Accommodations/CreateAccommodaiton';
import EditAccommodationForm from './Accommodations/EditAccommodationForm';
import AccommodationDetails from './Accommodations/AccommodationsDetails';
import EditPackingListForm from './Packing/EditPackingListForm';
import PackingListDetails from './Packing/PackingListDetails';
import Homepage from './Homepage';


Homepage

function EditBudgetFormWrapper() {
    const { budget_id } = useParams() // Extract budget_id from URL
    return <EditBudgetForm budgetId={budget_id} />
}

function EditAccommodationFormWrapper() {
    const { accommodation_id } = useParams() // Extract budget_id from URL
    return <EditAccommodationForm accommodationId={accommodation_id} />
}

function EditItineraryFormWrapper() {
    const { itinerary_id } = useParams()
    return <EditItineraryForm itineraryId={itinerary_id} />
}

function EditPackingListFormWrapper() {
    const { packingList_id } = useParams()
    return <EditPackingListForm packingListId={packingList_id} />
}

// All your environment variables in vite are in this objet
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
function App() {
    // Replace this App component with your own.
    // /** @type {[LaunchInfo | undefined, (info: LaunchInfo) => void]} */
    // const [launchInfo, setLaunchInfo] = useState()
    // const [error, setError] = useState(null)

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
        <AuthProvider baseUrl={API_HOST}>
            <Router>
                <Nav />
                <Routes>
                    <Route
                        path="/api/accommodations"
                        element={<Accommodations />}
                    />
                    <Route path="/api/packing_list" element={<Packing />} />
                    <Route path="/api/budgets" element={<Budget />} />
                    <Route
                        path="/api/budgets/create/"
                        element={<BudgetForm />}
                    />
                    <Route path="/api/login" element={<Login />} />
                    <Route path="/api/signup" element={<SignUp />} />
                    <Route path="/api/itinerary/" element={<Itinerary />} />
                    <Route
                        path="/api/itinerary/create/"
                        element={<ItineraryForm />}
                    />
                    <Route
                        path="/api/budgets/edit/:budget_id"
                        element={<EditBudgetFormWrapper />}
                    />
                    <Route
                        path="/api/packing_list/create/"
                        element={<PackingListForm />}
                    />
                    <Route
                        path="/api/itinerary/edit/:itinerary_id"
                        element={<EditItineraryFormWrapper />}
                    />
                    <Route
                        path="/api/budgets/:budget_id"
                        element={<BudgetDetails />}
                    />
                    <Route
                        path="/api/itinerary/:itinerary_id"
                        element={<ItineraryDetails />}
                    />
                    <Route
                        path="/api/accommodations/create/"
                        element={<AccommodationForm />}
                    />
                    <Route
                        path="/api/accommodations/edit/:accommodation_id"
                        element={<EditAccommodationFormWrapper />}
                    />
                    <Route
                        path="/api/accommodations/:accommodation_id"
                        element={<AccommodationDetails />}
                    />
                    <Route
                        path="/api/packing_list/edit/:packingList_id"
                        element={<EditPackingListFormWrapper />}
                    />
                    <Route
                        path="/api/packing_list/:packingList_id"
                        element={<PackingListDetails />}
                    />
                    <Route
                        path="/api/home"
                        element={<Homepage />}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
