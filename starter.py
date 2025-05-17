from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

# Load your data (e.g., a .txt or .md file)
loader = TextLoader("data/my_docs.txt", encoding="utf-8")
docs = loader.load()

# Split into ~500-token chunks with 50-token overlap
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)

# Initialize embeddings
embeddings = OpenAIEmbeddings()

# Build the Chroma vector store
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="chroma_db"
)

# Persist the index for later reuse
# vectorstore.persist()

# Load persisted index
# vectorstore = Chroma(persist_directory="chroma_db", embedding_function=embeddings)

# Create a retriever (fetch top 3)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# Define the QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0),
    chain_type="stuff",
    retriever=retriever
)