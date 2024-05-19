import React, {useState} from "react";

interface Property {
    city: string;
}

function FetchSimilarProperty() {
    const [propertyId, setPropertyId] = useState("");
    const [city, setCity] = useState([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPropertyId(e.target.value);
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/find_similar_properties/${propertyId}`, {
            method: "GET",
        })
        const responseData = await response.json();
        setCity(responseData);
    }

    return (
        <div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)}>
                <input type="text" placeholder="enter the city name" value={propertyId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <button type="submit">Get property</button>
            </form>
            {city.length !== 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {city.map((property: Property, index) => (
                            <tr key={index}>
                                <td>{property.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FetchSimilarProperty;





