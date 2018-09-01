import Chain from './components/chain.js';

const createChain = () => {
  window.mySalesChain = new Chain();
};

let chainIsBroken = false;

const createFirstBlocks = async () => {
  mySalesChain.addNewBlock({from: 'Dina', to: 'Dave', sales: 5000});
  await sleep(100);
  mySalesChain.addNewBlock({from: 'Dave', to: 'Frank', sales: 10000});
  await sleep(100);
  mySalesChain.addNewBlock({from: 'Frank', to: 'Mia', sales: 8500});
  await sleep(100);
  mySalesChain.addNewBlock({from: 'Mia', to: 'Jamé', sales: 12000});
  await sleep(100);
  mySalesChain.addNewBlock({from: 'Jamé', to: 'Kim', sales: 16000});
  console.log('DONE!');
}

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const updateChainView = () => {
  const chain = window.mySalesChain;
  setTimeout(() => updateChainView(chain), 100);
  if(window.previousChain === JSON.stringify(window.mySalesChain.getAllBlocks())) return;

  const view = document.getElementById('blockchain');
  while (view.firstChild) {
    view.removeChild(view.firstChild);
  }

  chainIsBroken = false;

  chain.getAllBlocks().forEach(block => {
    view.appendChild(createBlockView(block));
  });

  window.previousChain = JSON.stringify(window.mySalesChain.getAllBlocks());
};

const createBlockView = block => {
  const blockView = document.createElement('div');
  const blockIsValid = block.isBlockValid();

  if(!blockIsValid) { chainIsBroken = true};

  blockView.className = `block ${chainIsBroken && 'block--error'}`;

  const blockMeta = block.getMeta();
  const blockContent = block.getContent();

  const blockHash = block.isBlockValid() ? block.getMeta().hash : block.calculateHash();

  blockView.appendChild(createAttribute('block #', blockMeta.position, '#545b75'));
  blockView.appendChild(createAttribute('creationDate', friendlyDate(blockMeta.creationDate), '#545b75'));
  blockView.appendChild(createAttribute('previousHash', blockMeta.previousHash, '#545b75'));
  blockView.appendChild(createAttribute('hash', blockHash, '#545b75'));
  blockView.appendChild(createAttribute('nonce', blockMeta.nonce, '#545b75'));

  const contentWrapper = document.createElement('div');
  Object.keys(blockContent).forEach(key => {
    const value = blockContent[key];
    contentWrapper.className = 'block__contentwrapper';
    contentWrapper.append(createAttribute(key, value));
  });
  blockView.appendChild(contentWrapper);
  return blockView;
};

const createAttribute = (key, value, color = '#ffffff') => {
  const attributeContainer = document.createElement('div');
  attributeContainer.className = 'block__attribute';

  const attributeTitle = document.createElement('div');
  attributeTitle.className = 'block__attribute__title';
  attributeTitle.innerHTML = `${key}:`;
  attributeTitle.style.color = color;

  const attributeValue = document.createElement('div');
  attributeValue.className = 'block__attribute__value';
  attributeValue.innerHTML = value;
  attributeValue.style.color = color;

  attributeContainer.appendChild(attributeTitle);
  attributeContainer.appendChild(attributeValue);
  return attributeContainer;
};

const friendlyDate = timestamp => {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}


createChain();
updateChainView();
setTimeout(() => createFirstBlocks(), 500);

window.listChain = updateChainView;
