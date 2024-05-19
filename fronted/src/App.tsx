import {BrowserRouter, Routes, Route} from "react-router-dom"
import CreateProperty from "../components/createProperty"
import FetchPropertyDetails from "../components/fetchPropertyDetails"
import FetchCityByState from "../components/findCityByState"
import FetchSimilarProperty from "../components/findSimilarProperty"
import Home from "./Home"
function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<CreateProperty />} path="/create_new_property" />
                    <Route element={<FetchPropertyDetails />} path="/fetch_property_details" />
                    <Route element={<FetchCityByState />} path="/fetch_cities_by_state" />
                    <Route element={<FetchSimilarProperty />} path="/fetch_similar_properties" />
                </Routes>


            </BrowserRouter>

        </div>
    )
}

export default App
