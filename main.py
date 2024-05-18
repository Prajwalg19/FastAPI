import motor.motor_asyncio
from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware

# class StudentModel(BaseModel):
#     """
#     Container for a single student record.
#     """
#
#     # The primary key for the StudentModel, stored as a `str` on the instance.
#     # This will be aliased to `_id` when sent to MongoDB,
#     # but provided as `id` in the API requests and responses.
#     id: Optional[PyObjectId] = Field(alias="_id", default=None)
#     name: str = Field(...)
#     email: EmailStr = Field(...)
#     course: str = Field(...)
#     gpa: float = Field(..., le=4.0)
#     model_config = ConfigDict(
#         populate_by_name=True,
#         arbitrary_types_allowed=True,
#         json_schema_extra={
#             "example": {
#                 "name": "Jane Doe",
#                 "email": "jdoe@example.com",
#                 "course": "Experiments, Science, and Fashion in Nanophotonics",
#                 "gpa": 3.0,
#             }
#         },
#     )
#
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URI = "mongodb+srv://prajw4lg:4VoEc3sMryoMdEaA@cluster0.ouqrs10.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)

database = client["test"]
propertyCollection = database["properties"]


@app.get("/")
def read():
    return {"Hello": "World"}


@app.post("/create_new_property")
async def create_new_property(data: dict[str, str]):
    property_name = data.get("property_name")
    address = data.get("address")
    city = data.get("city")
    state = data.get("state")

    if not (property_name and address and city and state):
        raise HTTPException(status_code=422, detail="Missing required fields")

    document = await propertyCollection.insert_one(
        {
            "property_name": property_name,
            "address": address,
            "city": city,
            "state": state,
        }
    )

    return {"message": "Property created successfully"}




@app.get("/fetch_property_details/{city_name}")
async def fetch_properties(city_name: str):
    try:
        properties_cursor = propertyCollection.find({"city": city_name}, {"_id": 0})
        properties = []
        async for property in properties_cursor:
            properties.append(property)
        return properties

    except Exception as e:
        return HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

from fastapi import HTTPException
from bson import ObjectId
@app.put("/update_property_details")
async def update_properties(data: dict[str, str]):
    try:
        property_id = data.get("property_id")
        property_name = data.get("property_name")
        address = data.get("address")
        city = data.get("city")
        state = data.get("state")

        property_id = ObjectId(property_id)
        result = await propertyCollection.update_one(
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



# state = database["state"]
# @api.get("/find_cities_by_state")
# def find_cities_by_state(data : dict[str,str]):
#     try:
#         state_id = data.get("state_id")
#         state_name = data.get("state_name")
#
#
#     except Exception as e:
#
