RAGIt 
======

**Langchain implementation to access elements in <span> of given sources and use them as the knowledge base for user queries.**

To run the project you must have Docker installed.

If you do, to run the project :

1)clone  
2)Add your Hugging Face token to the RagIt-back/.env file in the root directory against HUGGING_FACE_TOKEN key. 
Then go to the root directory of the project in your CLI and type

**docker-compose up --build**

TO make sure the containers are up and running, look for:


![image](https://github.com/user-attachments/assets/8114fd35-0281-4667-86d3-4a3c8e3c8d34)
 



Now you can access you homepage at http://localhost

Enter your Question and the Sources that you want to serve as your knowledge base.  

sample output


![ssample_usage](https://github.com/user-attachments/assets/d480fa68-1f87-416b-8a44-ab2880cc0155)



![ssample_usage_2](https://github.com/user-attachments/assets/c0534f56-8d07-4f27-87cb-60260a2eba94)
