import React, {useState} from "react";

interface Property {
    property_name: string;
    address: string;
    city: string;
    state: string;
}

function CreateProperty() {
    const [alert, setAlert] = useState("");
    const [data, setData] = useState<Property>({
        property_name: "",
        address: "",
        city: "",
        state: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData((prev) => (
            {
                ...prev,
                [e.target.id]: e.target.value
            }
        ));
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/create_new_property`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        });
        const responseData = await response.json();
        setAlert(responseData.message)
    }

    return (
        <div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)}>
                <input type="text" placeholder="property name" id="property_name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <input type="text" placeholder="address" id="address" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <input type="text" placeholder="city" id="city" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <input type="text" placeholder="state" id="state" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <button type="submit">Submit</button>
            </form>
            {
                alert.length != 0 && (
                    <>{alert}</>
                )}

        </div>
    );
}

export default CreateProperty;
