import {Link} from "react-router-dom";

export default function Home() {
    return (
        <ul className="h-screen flex flex-col gap-5  items-center justify-center ">
            <li className="w-[15rem] rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 border-black/15 border">
                <Link
                    to="/create_new_property"
                    className="block p-6 text-center text-blue-600 hover:text-blue-800"
                >
                    Create new Property
                </Link>
            </li>
            <li className="w-[15rem] rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 border-black/15 border">
                <Link
                    to="/update_property_details"
                    className="block p-6 text-center text-blue-600 hover:text-blue-800"
                >
                    Update property details
                </Link>
            </li>
            <li className="w-[15rem] rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 border-black/15 border">
                <Link
                    to="/fetch_property_details"
                    className="block p-6 text-center text-blue-600 hover:text-blue-800"
                >
                    Fetch property details
                </Link>
            </li>
            <li className="w-[15rem] rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 border-black/15 border">
                <Link
                    to="/fetch_cities_by_state"
                    className="block p-6 text-center text-blue-600 hover:text-blue-800"
                >
                    Fetch cities by state
                </Link>
            </li>
            <li className="w-[15rem] rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 border-black/15 border">
                <Link
                    to="/fetch_similar_properties"
                    className="block p-6 text-center text-blue-600 hover:text-blue-800"
                >
                    Fetch similar property
                </Link>
            </li>
        </ul>
    );
}
