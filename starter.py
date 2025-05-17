import requests
from langchain_community.document_loaders import AsyncHtmlLoader
from langchain_community.document_transformers import BeautifulSoupTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
import os
from langchain.embeddings import HuggingFaceEmbeddings
embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5",    
    model_kwargs={'device':'cpu'},
    encode_kwargs={'normalize_embeddings': False}
)
from langchain.vectorstores import FAISS
from fastapi import FastAPI

app = FastAPI()


load_dotenv()

HUGGIN_FACE_TOKEN=os.getenv("HUGGING_FACE_TOKEN")



urls = ["https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
        "https://www.europarl.europa.eu/news/en/press-room/20240308IPR19015/artificial-intelligence-act-meps-adopt-landmark-law"]
loader = AsyncHtmlLoader(urls)
docs = loader.load()

bs_transformer = BeautifulSoupTransformer()
docs_transformed = bs_transformer.transform_documents(docs, tags_to_extract=["span"])

# Grab the first 1000 tokens of the site
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
chunks = text_splitter.split_documents(docs_transformed)
db = FAISS.from_documents(chunks, embeddings)



retriever = db.as_retriever(search_type = "similarity",search_kwargs={"k":4})
                            
                            

def get_context(question):
    docs = retriever.get_relevant_documents(question)
    context = ""
    for i in range(len(docs)):
        context +=  docs[i].page_content
    return(context)

question = "Where does the AI act apply ?"
context= get_context(question)
prompt = "You are an intelligent agent. Answer the questions based on the given context. \n"+ \
    "Context: {}  \n".format(context) + \
    "Question: {}".format(question)

API_URL = "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct/v1/chat/completions"
headers = {"Authorization": HUGGIN_FACE_TOKEN,
          "Content-Type": "application/json"}
payload = {"model": "microsoft/Phi-3-mini-4k-instruct","messages": [{"role": "user", "content": prompt}],"max_tokens": 500}


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query(payload)
print(output['choices'][0]['message']['content'])


@app.get("/answer")
async def root():
    return {output['choices'][0]['message']['content']}