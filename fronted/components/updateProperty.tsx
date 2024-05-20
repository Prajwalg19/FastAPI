import React, {useState} from "react";
interface Property {
    property_id: string,
    property_name: string;
    address: string;
    city: string;
    state: string;
}

function UpdateProperty() {
    const [alert, setAlert] = useState("");
    const [data, setData] = useState<Property>({
        property_id: "",
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
        const response = await fetch(`http://localhost:8000/update_property_details`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        })
        const responseData = await response.json();
        setAlert(responseData.message)
    }

    return (
        <div>
            <h1 className="">Update property form</h1>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)}>
                <input type="text" placeholder="property id" id="property_id" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <input type="text" placeholder="property name" id="property_name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <input type="text" placeholder="address" id="address" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <input type="text" placeholder="city" id="city" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <input type="text" placeholder="state" id="state" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <button type="submit">Update property</button>
            </form>
            {
                alert.length != 0 && (
                    <>{alert}</>
                )}


        </div>
    );
}

export default UpdateProperty;





