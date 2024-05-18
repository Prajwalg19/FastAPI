function App() {

    async function handleClick() {
        const response = await fetch("http://localhost:8000/fetch_property_details/manglore", {
            method: "GET"
        })
        console.log(response)

    }
    return (
        <div>
            <button onClick={handleClick}>Get property</button>
        </div>
    )
}

export default App
