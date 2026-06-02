from fastapi import APIRouter
from blockchain.blockchain import blockchain
from database.mongodb import blockchain_collection

router = APIRouter()


# VIEW ALL BLOCKS
@router.get("/blockchain")
def get_blockchain():

    blocks = []

    all_blocks = blockchain_collection.find()

    for block in all_blocks:

        # REMOVE MONGODB OBJECT ID
        block["_id"] = str(block["_id"])

        blocks.append(block)

    return {
        "total_blocks": len(blocks),
        "blocks": blocks
    }


# VALIDATE BLOCKCHAIN
@router.get("/validate-blockchain")
def validate_blockchain():

    result = blockchain.validate_chain()

    return result