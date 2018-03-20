import sha1 from 'sha1';
// import moment from '../node_modules/moment/moment.js';

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

    while (!this.hashMeetsDifficulty(hash)) {
      hash = this.calculateHash(nonce);
      nonce += 1;
    };

    nonce -= 1;

    this.hash = hash;
    return nonce;
  }

  calculateHash(nonce = this.nonce) {
    return sha1(`${nonce}` + this.creationDate + this.previousHash + JSON.stringify(this.content));
  }

  isBlockValid() {
    const hashIsTheSame = this.calculateHash(this.nonce) === this.hash;
    return hashIsTheSame;
  }

  getMeta() {
    return {
      creationDate: this.creationDate,
      position: this.position,
      previousHash: this.previousHash,
      hash: this.hash,
      index: this.index,
      nonce: this.nonce,
    }
  }

  getContent(){
    return this.content;
  }

}

export default Block;