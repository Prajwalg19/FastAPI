import {BrowserRouter, Routes, Route} from "react-router-dom"
import CreateProperty from "../components/createProperty"
import './index.css'
import FetchPropertyDetails from "../components/fetchPropertyDetails"
function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<CreateProperty />} path="/create_new_property" />
                    <Route element={<FetchPropertyDetails />} path="/fetch_property_details" />
                    <Route element={<FetchPropertyDetails />} path="/fetch_cities_by_state" />
                </Routes>


            </BrowserRouter>

        </div>
    )
}

export default App
