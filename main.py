import motor.motor_asyncio
from fastapi import FastAPI
from fastapi import HTTPException
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

MY_ENV_VAR = os.getenv('MONGO_URI')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = motor.motor_asyncio.AsyncIOMotorClient(MY_ENV_VAR)

database = client["test"]
collection = database["properties"]


# test api
@app.get("/")
def read():
    return {"Hello": "World"}

# api to create property listing
@app.post("/create_new_property")
async def create_new_property(data: dict[str, str]):
    property_name = data.get("property_name")
    address = data.get("address")
    city = data.get("city")
    state = data.get("state")

    if not (property_name and address and city and state):
        raise HTTPException(status_code=422, detail="Missing required fields")

    document = await collection.insert_one(
        {
            "property_name": property_name,
            "address": address,
            "city": city,
            "state": state,
        }
    )

    return {"message": "Property created successfully"}



# api to fetch listing

@app.get("/fetch_property_details/{city_name}")
async def fetch_properties(city_name: str):
    try:
        properties_cursor = collection.find({"city": city_name}, {"_id": 0})
        properties = []
        async for property in properties_cursor:
            properties.append(property)
        return properties

    except Exception as e:
        return HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# api to update listing
@app.put("/update_property_details")
async def update_properties(data: dict[str, str]):
    try:
        property_id = data.get("property_id")
        property_name = data.get("property_name")
        address = data.get("address")
        city = data.get("city")
        state = data.get("state")

        property_id = ObjectId(property_id)
        result = await collection.update_one(
            {"_id": property_id},
            {"$set":
                {"property_name": property_name,
                 "address": address,
                 "city": city,
                 "state": state
                 }
             })
        print(result.raw_result)

        if result.modified_count == 1:
            return {"message": "Property details updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="No changes were made")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")



# api to find cities belonging to one state
@app.get("/find_cities_by_state/{state_name}")
async def find_cities_by_state(state_name : str):
    try:
        # state_id = data.get("state_id")
        cursor = collection.aggregate(
                [
                    {
                        "$match": { "state" : state_name}

                        }, {
                            "$group": {
                                "_id": "$city"
                                }
                            },
                        {
                                "$project":{
                                    "city":"$_id",
                                    "_id": 0
                                    }

                                }

                    ]
                )
        cities = []
        async for city in cursor :
            cities.append(city)
        return cities
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# api to find properties belonging to same city via id of one property
@app.get("/find_similar_properties/{property_id}")
async def find_similar_properties(property_id : str):
    try:
        property_id = ObjectId(property_id)
        one_city = collection.find({"_id": property_id}, {"_id": 0})

        async for city in one_city:
            one_city = city


        cursor = collection.find({  "city" : one_city["city"] } , {"_id": 0})
        cities = []
        async for city in cursor :
            cities.append(city)
        return cities
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

