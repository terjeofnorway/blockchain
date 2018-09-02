import Chain from './components/chain';
import { RenderHelper } from './renderHelper';

const createChain = () => new Chain();

let previousChain;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const createFirstBlocks = async (mySalesChain) => {
  mySalesChain.addNewBlock({ from: 'Dina', to: 'Dave', sales: 5000 });
  await sleep(100);
  mySalesChain.addNewBlock({ from: 'Dave', to: 'Frank', sales: 10000 });
  await sleep(100);
  mySalesChain.addNewBlock({ from: 'Frank', to: 'Mia', sales: 8500 });
  await sleep(100);
  mySalesChain.addNewBlock({ from: 'Mia', to: 'Jamé', sales: 12000 });
  await sleep(100);
  mySalesChain.addNewBlock({ from: 'Jamé', to: 'Kim', sales: 16000 });
};

const drawChainView = (chain) => {
  if (previousChain === JSON.stringify(chain.getAllBlocks())) return;

  const view = document.getElementById('blockchain');

  // Remove all children before re-creating.
  while (view.firstChild) {
    view.removeChild(view.firstChild);
  }

  chain.getAllBlocks().forEach((block) => {
    view.appendChild(RenderHelper.createBlockView(block));
  });

  previousChain = JSON.stringify(chain.getAllBlocks());
  setTimeout(() => drawChainView(chain), 500);
};


const mySalesChain = createChain();
drawChainView(mySalesChain);
setTimeout(() => createFirstBlocks(mySalesChain), 500);
