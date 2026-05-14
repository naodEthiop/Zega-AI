import chromadb
from sentence_transformers import SentenceTransformer


class ChromaDBService:
    """ChromaDB vector search service"""
    
    def __init__(self):
        self.client = chromadb.Client()
        self.embedding_model = SentenceTransformer('distiluse-base-multilingual-cased-v2')
    
    def create_collection(self, name: str):
        """Create a new collection"""
        return self.client.create_collection(
            name=name,
            metadata={"hnsw:space": "cosine"}
        )
    
    def add_documents(self, collection_name: str, documents: list, ids: list, metadatas: list = None):
        """Add documents to collection"""
        try:
            collection = self.client.get_or_create_collection(name=collection_name)
            embeddings = [self.embedding_model.encode(doc) for doc in documents]
            
            collection.upsert(
                documents=documents,
                embeddings=embeddings,
                ids=ids,
                metadatas=metadatas or [{}] * len(documents)
            )
            return True
        except Exception as e:
            print(f"Error adding documents: {str(e)}")
            return False
    
    def search(self, collection_name: str, query: str, n_results: int = 5) -> list:
        """Search for documents"""
        try:
            collection = self.client.get_collection(name=collection_name)
            query_embedding = self.embedding_model.encode(query)
            
            results = collection.query(
                query_embeddings=[query_embedding],
                n_results=n_results
            )
            return results
        except Exception as e:
            print(f"Error searching documents: {str(e)}")
            return []
