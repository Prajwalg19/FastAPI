import React, {useState} from "react";

interface Property {
    city: string;
}

function FetchCityByState() {
    const [stateName, setStateName] = useState("");
    const [cities, setCities] = useState<Property[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStateName(e.target.value);
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/find_cities_by_state/${stateName}`, {
            method: "GET",
        });
        const responseData = await response.json();
        setCities(responseData);
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center max-w-md mx-auto">
            <h1 className="text-center text-2xl font-semibold mb-4">Find cities in the state</h1>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)} className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Enter the state name"
                    value={stateName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Get Cities
                </button>
            </form>
            {cities.length !== 0 && (
                <table className="mt-4 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((property: Property, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                <td className="px-4 py-2">{property.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FetchCityByState;
