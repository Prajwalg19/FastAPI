import {Link} from "react-router-dom"
export default function Home() {
    return (
        <ul>
            <li><Link to="/create_new_property">Create new Property</Link></li >
            <li><Link to="/update_property_details">Update property details</Link></li >
            <li><Link to="/fetch_property_details">Fetch property details</Link></li >
            <li><Link to="/fetch_cities_by_state">Fetch cities by state</Link></li >
            <li><Link to="/fetch_similar_properties">Fetch similar property</Link></li >

        </ul >
    )

}
