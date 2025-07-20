import pandas as pd
import os
import openai
from dotenv import load_dotenv
from sqlalchemy import create_engine
from llama_index.experimental.query_engine import PandasQueryEngine
from prompts import new_prompt, instruction_str, context
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.core.agent import ReActAgent
from llama_index.llms.openai import OpenAI
from llama_index.core import StorageContext, VectorStoreIndex, load_index_from_storage
from llama_index.core import download_loader

load_dotenv()

def get_index(data, index_name):
    index = None
    if not os.path.exists(index_name):
        print("building index", index_name)
        index = VectorStoreIndex.from_documents(data, show_progress=True)
        index.storage_context.persist(persist_dir=index_name)
    else:
        index = load_index_from_storage(
            StorageContext.from_defaults(persist_dir=index_name)
        )

    return index

def get_transactions_df(engine):
    df = pd.read_sql("SELECT * FROM transactions", con=engine)
    return df

def query_transactions(engine, query):
    transactions_df = get_transactions_df(engine)
    transactions_query_engine = PandasQueryEngine(df=transactions_df, verbose=True, instruction_str=instruction_str)
    transactions_query_engine.update_prompts({"pandas_prompt": new_prompt})


    PDFReader = download_loader("PDFReader")

    pdf_path = os.path.join("data", "pftinfo.pdf")
    pft_pdf = PDFReader().load_data(file=pdf_path)
    pft_index = get_index(pft_pdf, "Personal Finance Tracker Information")
    pft_engine = pft_index.as_query_engine()

    # cutom data that the agent can access when queried
    tools = [
        # this tool is used to query the transactions data
        QueryEngineTool(query_engine=transactions_query_engine, metadata=ToolMetadata(
            name="transactions_data",
            description="This gives information about all of the users specific transactions"
        )),
        # this tool is used to query the personal finance tracker information
        QueryEngineTool(query_engine=pft_engine, metadata=ToolMetadata(
            name="personal_finance_tracker_information", 
            description="""this gives detailed information about all the detailes regarding 
                           the personal finance tracker and the resources it provides to help 
                           the student (user) with financial mastery"""
        ))
    ]

    # Agent creattion with gpt-4o llm
    llm = OpenAI(model="gpt-4o-mini")
    agent = ReActAgent.from_tools(
        tools=tools,
        llm=llm,
        verbose=True,
        context=context,

    )

    res = agent.query(query)
    return res

if __name__ == "__main__":
    from main import db
    #OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    engine = db.engine
    res = query_transactions(engine, "What is the purpose of this tracker")
    print(res)






