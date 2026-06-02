import hashlib
import json
from datetime import datetime

from database.mongodb import blockchain_collection


class Blockchain:

    def __init__(self):
        self.create_genesis_block()

    # CREATE FIRST BLOCK
    def create_genesis_block(self):

        existing_block = blockchain_collection.find_one({"index": 0})

        if existing_block:
            return

        genesis_block = {
            "index": 0,
            "timestamp": str(datetime.now()),
            "data": "Genesis Block",
            "previous_hash": "0",
            "hash": "0"
        }

        blockchain_collection.insert_one(genesis_block)

    # GENERATE HASH
    def generate_hash(self, block_data):

        encoded_data = json.dumps(
            block_data,
            sort_keys=True,
            default=str
        ).encode()

        return hashlib.sha256(encoded_data).hexdigest()

    # GET LAST BLOCK
    def get_last_block(self):

        return blockchain_collection.find_one(
            sort=[("index", -1)]
        )

    # ADD NEW BLOCK
    def add_block(self, enquiry_data):

        last_block = self.get_last_block()

        new_block = {
            "index": last_block["index"] + 1,
            "timestamp": str(datetime.now()),
            "data": enquiry_data,
            "previous_hash": last_block["hash"]
        }

        # CREATE COPY FOR HASHING
        block_copy = new_block.copy()

        # GENERATE HASH
        new_block["hash"] = self.generate_hash(block_copy)

        # SAVE BLOCK
        blockchain_collection.insert_one(new_block)

        return new_block

    # VALIDATE BLOCKCHAIN
    def validate_chain(self):

        blocks = list(
            blockchain_collection.find().sort("index", 1)
        )

        for i in range(1, len(blocks)):

            current_block = blocks[i]
            previous_block = blocks[i - 1]

            # CHECK PREVIOUS HASH
            if current_block["previous_hash"] != previous_block["hash"]:

                return {
                    "valid": False,
                    "message": f"Blockchain tampering detected at block {current_block['index']}"
                }

            # RECREATE HASH
            block_copy = {
                "index": current_block["index"],
                "timestamp": current_block["timestamp"],
                "data": current_block["data"],
                "previous_hash": current_block["previous_hash"]
            }

            recalculated_hash = self.generate_hash(block_copy)

            # CHECK HASH MATCH
            if recalculated_hash != current_block["hash"]:

                return {
                    "valid": False,
                    "message": f"Hash mismatch detected at block {current_block['index']}"
                }

        return {
            "valid": True,
            "message": "Blockchain is valid and secure"
        }


# CREATE BLOCKCHAIN OBJECT
blockchain = Blockchain()