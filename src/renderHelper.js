class DateHelper {
  static friendlyDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}

class RenderHelper {
  static createAttribute(key, value, color = '#ffffff') {
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
  }

  static createBlockView(block) {
    const blockView = document.createElement('div');
    const blockIsValid = block.isBlockValid();
    const chainIsBroken = !blockIsValid;

    blockView.className = `block ${chainIsBroken && 'block--error'}`;

    const blockMeta = block.getMeta();
    const blockContent = block.getContent();

    const blockHash = block.isBlockValid() ? block.getMeta().hash : block.calculateHash();

    blockView.appendChild(RenderHelper.createAttribute('block #', blockMeta.position, '#545b75'));
    blockView.appendChild(RenderHelper.createAttribute('creationDate', DateHelper.friendlyDate(blockMeta.creationDate), '#545b75'));
    blockView.appendChild(RenderHelper.createAttribute('previousHash', blockMeta.previousHash, '#545b75'));
    blockView.appendChild(RenderHelper.createAttribute('hash', blockHash, '#545b75'));
    blockView.appendChild(RenderHelper.createAttribute('nonce', blockMeta.nonce, '#545b75'));

    const contentWrapper = document.createElement('div');
    Object.keys(blockContent).forEach((key) => {
      const value = blockContent[key];
      contentWrapper.className = 'block__contentwrapper';
      contentWrapper.append(RenderHelper.createAttribute(key, value));
    });
    blockView.appendChild(contentWrapper);
    return blockView;
  }
}

export { RenderHelper, DateHelper };
