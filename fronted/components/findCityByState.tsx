import React, {useState} from "react";

interface Property {
    city: string;
}

function FetchCityByState() {
    const [state_name, setStateName] = useState("");
    const [city, setCity] = useState([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStateName(e.target.value);
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {"state_name": state_name}
        const response = await fetch("http://localhost:8000/find_cities_by_state", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json();
        setCity(responseData);
    }

    return (
        <div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)}>
                <input type="text" placeholder="enter the city name" value={state_name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
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

export default FetchCityByState;




