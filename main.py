from typing import Union, Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from sqlmodel import Field, Session, SQLModel, create_engine, select

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    room: str
    date: str

engine = create_engine("sqlite:///database.db")
SQLModel.metadata.create_all(engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/save")
def save_user(user:User):
    user1 = User(name=user.name, room=user.room, date=user.date)
    with Session(engine) as session:
        session.add(user1)
        session.commit()

@app.get("/db-users")
def get_users():
    users_list = []
    with Session(engine) as session:
        allUsers = session.exec(select(User))
        users_list = [{"id":user.id,"name":user.name, "room": user.room, "date": user.date} for user in allUsers]

    return users_list 

@app.get("/delete/{id}")
def return_key(id: int):
    
    with Session(engine) as session:
        statement = select(User).where(User.id == id)
        results = session.exec(statement)
        hero = results.one()
        print(hero)
        session.delete(hero)
        session.commit()


