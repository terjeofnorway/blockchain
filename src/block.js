import sha1 from 'sha1';

class Block {
  constructor(previousHash = '', content = {}, position = 0){
    this.creationDate = Date.now();
    this.previousHash = previousHash;
    this.content = content;
    this.position = position;
    this.hash = this.calculateHash();
  }

  getHash() {
    return this.hash;
  }

  calculateHash() {
    return sha1(this.creationDate + this.previousHash + JSON.stringify(this.content));
  }

  isBlockValid() {
    return true;
  }

  getMeta() {
    return {
      creationDate: this.creationDate,
      position: this.position,
      previousHash: this.previousHash,
      hash: this.hash,
    }
  }

  getContent(){
    return this.content;
  }

}

export default Block;