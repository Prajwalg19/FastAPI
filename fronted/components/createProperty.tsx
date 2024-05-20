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
        setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/create_new_property`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        setAlert(responseData.message);
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center ">
            <h1 className="text-center text-2xl font-semibold mb-4">Create property listing</h1>
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)}>
                    <input
                        className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Property Name"
                        id="property_name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    />
                    <input
                        className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Address"
                        id="address"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    />
                    <input
                        className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="City"
                        id="city"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    />
                    <input
                        className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="State"
                        id="state"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                {alert.length !== 0 && <p className="text-center mt-4 text-sm text-gray-600">{alert}</p>}
            </div>


        </div>
    );
}

export default CreateProperty;
