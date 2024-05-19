import React, {useState} from "react";

interface Property {
    property_name: string;
    address: string;
    city: string;
    state: string;
}

function FetchPropertyDetails() {
    const [cityName, setCityName] = useState("");
    const [city, setCity] = useState([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCityName(e.target.value);
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000//fetch_property_details/${cityName}`, {
            method: "GET"
        })
        const responseData = await response.json();
        setCity(responseData);
    }

    return (
        <div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)}>
                <input type="text" placeholder="enter the city name" value={cityName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <button type="submit">Get property</button>
            </form>
            {city.length !== 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Property Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {city.map((property: Property, index) => (
                            <tr key={index}>
                                <td>{property.property_name}</td>
                                <td>{property.address}</td>
                                <td>{property.city}</td>
                                <td>{property.state}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FetchPropertyDetails;



