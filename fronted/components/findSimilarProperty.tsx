import React, {useState} from "react";

interface Property {
    property_name: string;
    address: string;
    city: string;
    state: string;
}

function FetchSimilarProperty() {
    const [propertyId, setPropertyId] = useState("");
    const [properties, setProperties] = useState<Property[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPropertyId(e.target.value);
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/find_similar_properties/${propertyId}`, {
            method: "GET",
        });
        const responseData = await response.json();
        setProperties(responseData);
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center max-w-md mx-auto">
            <h1 className="text-center text-2xl font-semibold mb-4">Find similar property using id</h1>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)} className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Enter the property ID"
                    value={propertyId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <button
                    type="submit"
                    className="whitespace-nowrap bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Get Property
                </button>
            </form>
            {properties.length !== 0 && (
                <table className="mt-4 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Property Name</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">City</th>
                            <th className="px-4 py-2">State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property: Property, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                <td className="px-4 py-2">{property.property_name}</td>
                                <td className="px-4 py-2">{property.address}</td>
                                <td className="px-4 py-2">{property.city}</td>
                                <td className="px-4 py-2">{property.state}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FetchSimilarProperty;
