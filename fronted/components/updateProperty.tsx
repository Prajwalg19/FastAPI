import React, {useState} from "react";

interface Property {
    property_id: string;
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
        setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    async function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/update_property_details`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        setAlert(responseData.message);
    }

    return (
        <div className="max-w-md flex flex-col justify-center items-center h-screen mx-auto">
            <h1 className="text-center text-2xl font-semibold mb-4">Update Property Form</h1>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClick(e)} className="space-y-4">
                <input
                    type="text"
                    placeholder="Property ID"
                    id="property_id"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <input
                    type="text"
                    placeholder="Property Name"
                    id="property_name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <input
                    type="text"
                    placeholder="Address"
                    id="address"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <input
                    type="text"
                    placeholder="City"
                    id="city"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <input
                    type="text"
                    placeholder="State"
                    id="state"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                >
                    Update Property
                </button>
            </form>
            {alert.length !== 0 && <p className="text-center mt-4 text-sm text-gray-600">{alert}</p>}
        </div>
    );
}

export default UpdateProperty;
