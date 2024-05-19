import React, {useState} from "react";
function UpdateProperty() {
    const [propertyId, setPropertyId] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPropertyId(e.target.value);
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/find_similar_properties/${propertyId}`, {
            method: "GET",
        })
        const responseData = await response.json();
        if (responseData) console.log("successfull")
    }

    return (
        <div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)}>
                <input type="text" placeholder="enter the city name" value={propertyId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <button type="submit">Get property</button>
            </form>
        </div>
    );
}

export default UpdateProperty;





