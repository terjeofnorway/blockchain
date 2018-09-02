import Block from './block';

class Chain {
  constructor() {
    this.blockChain = [];
    this.DIFFICULTY = '1234';
  }

  addNewBlock(salesInfo) {
    const firstNumbersInHash = this.DIFFICULTY;

    // If there are no blocks in the chain, this is the genesis block and hence, no previous hash.
    const latestBlockInChain = this.getLatestBlock();
    const previousHash = latestBlockInChain ? latestBlockInChain.getHash() : 0;

    // Create the actual block
    const block = new Block(previousHash, salesInfo, this.blockChain.length, firstNumbersInHash);

    // Add the block to the chain
    this.blockChain.push(block);
  }

  getLatestBlock() {
    return this.blockChain.length > 0 ? this.blockChain[this.blockChain.length - 1] : false;
  }

  getAllBlocks() {
    return this.blockChain;
  }
}

export default Chain;
