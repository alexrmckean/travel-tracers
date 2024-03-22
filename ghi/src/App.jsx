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
import AccommodationForm from './Accommodations/CreateAccommodation';
import EditAccommodationForm from './Accommodations/EditAccommodationForm';
import AccommodationDetails from './Accommodations/AccommodationsDetails';
import EditPackingListForm from './Packing/EditPackingListForm';
import PackingListDetails from './Packing/PackingListDetails';
import Homepage from './Components/homepage';


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


console.table(import.meta.env)


const API_HOST = import.meta.env.VITE_API_HOST
const API_URL = import.meta.env.VITE_API_URL

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}


function App() {
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
