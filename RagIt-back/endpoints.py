from fastapi import FastAPI
from pydantic import BaseModel
from starter import qa_chain
app = FastAPI()

class Query(BaseModel):
    question: str

@app.post("/ask")
async def ask(q: Query):
    answer = qa_chain.run(q.question)
    return {"answer": answer}