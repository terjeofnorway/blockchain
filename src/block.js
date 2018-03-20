import sha1 from 'sha1';

class Block {
  constructor(previousHash = '', content = {}, position = 0, difficulty = ''){
    this.difficulty = difficulty;
    this.creationDate = Date.now();
    this.previousHash = previousHash;
    this.content = content;
    this.position = position;
    this.hash = null;
    this.nonce = this.mineNonce();
  }

  getHash() {
    return this.hash;
  }

  hashMeetsDifficulty(hash) {
    return hash.substring(0, this.difficulty.length) === this.difficulty;
  }

  mineNonce(){
    let hash = '';
    let nonce = 0;

    // Keep going until difficulty criteria are met.
    while (!this.hashMeetsDifficulty(hash)) {
      nonce += 1;
      hash = this.calculateHash(nonce);
    };

    this.hash = hash;
    return nonce;
  }

  calculateHash(nonce = this.nonce) {
    return sha1(`${nonce}` + this.creationDate + this.previousHash + JSON.stringify(this.content));
  }

  isBlockValid() {
    return this.calculateHash(this.nonce) === this.hash;
  }

  getMeta() {
    return {
      creationDate: this.creationDate,
      position: this.position,
      previousHash: this.previousHash,
      hash: this.hash,
      nonce: this.nonce,
    }
  }

  getContent(){
    return this.content;
  }

}

export default Block;