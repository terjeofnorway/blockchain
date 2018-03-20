import Block from './block.js';

class Chain {
  constructor() {
    this.starTrekPosterChain = [];
  }

  addNewBlock(salesInfo){
    const firstNumbersInHash = '123';
    const latestBlockInChain = this.getLatestBlock();
    const previousHash = latestBlockInChain ? latestBlockInChain.getHash() : 0;
    const block = new Block(previousHash, salesInfo, this.starTrekPosterChain.length, firstNumbersInHash);
    this.starTrekPosterChain.push(block);
  }

  getLatestBlock() {
    return this.starTrekPosterChain.length > 0 ? this.starTrekPosterChain[this.starTrekPosterChain.length - 1] : false;
  }

  getAllBlocks(){
    return this.starTrekPosterChain;
  }
}

export default Chain;