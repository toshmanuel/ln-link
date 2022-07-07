import { Buffer } from 'buffer';
let { bech32 } = require('bech32');

const LIGHTNING_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const BOLT12_SCHEME = 'lno1';
const LNURL_SCHEME = 'lnurl';
const XPUB_SCHEME = 'xpub';
const XPUB_REGEX = /^([xyYzZtuUvV]pub[1-9A-HJ-NP-Za-km-z]{79,108})$/;
const BTC_REGEX = /([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}/;

const handleLNURL = (invoice) => {
  // Decoding bech32 LNURL
  const decodedLNURL = bech32.decode(invoice, 1500);
  const url = Buffer.from(bech32.fromWords(decodedLNURL.words)).toString();
  
  return fetch('https://satcors.fiatjaf.com/?url=' + encodeURIComponent(url))
  .then(r => r.json())
};

const handleLightningAddress = (internetIdentifier) => {
  const addressArr = internetIdentifier.split('@');

  // Must only have 2 fields (username and domain name)
  if (addressArr.length !== 2) {
    return {
      success: false,
      message: 'Invalid internet identifier format.',
    };
  }

  const [username, domain] = addressArr;

  // Must only have 2 fields (username and domain name)
  if (addressArr[1].indexOf('.') === -1) {
    return {
      success: false,
      message: 'Invalid internet identifier format.',
    };
  }

  const url = `https://${domain}/.well-known/lnurlp/${username}`;

  return fetch('https://satcors.fiatjaf.com/?url=' + encodeURIComponent(url))
  .then(r => r.json())
  .then(data => {
    data.domain = domain;
    console.log("Lightning Address Info: ", data);
    return {
      success: true,
      data: {
        ...data,
        domain,
        username,
      },
    }
  }).catch(_ => {
    return {
      success: false,
      message: 'This identifier does not support Lightning Address yet.',
    };
  });
};

const handleBOLT12 = (invoice) => {
  // Check if Invoice starts with `lno1` prefix
  if (!invoice.includes(BOLT12_SCHEME)) {
    return null;
  }

  const decode_url = `https://bootstrap.bolt12.org/decode/${invoice}`;

  return fetch('https://satcors.fiatjaf.com/?url=' + encodeURIComponent(decode_url))
  .then(r => r.json())
  .then(data => {
    data.valid = true;
    console.log("BOLT 12 Offer data: ", data);
    return {
      success: true,
      data: {
        ...data,
      },
    }
  }).catch(_ => {
    return {
      success: false,
      message: 'Not a valid BOLT 12 offer',
    };
  });
};

const handleNodeID = (identifier) => {
  const nodeArr = identifier.split('@');

  // Must only have 2 fields (pubKey and IP:Port)
  if (nodeArr.length !== 2) {
    return {
      success: false,
      message: 'Invalid lightning node format.',
    };
  }

  const [nodeId, address] = nodeArr;

  // check if port number exists too
  if (nodeArr[1].indexOf(':') === -1) {
    return {
      success: false,
      message: 'Invalid lightning node format.',
    };
  }

  const url = `https://1ml.com/node/${nodeId}/json`;

  return fetch('https://satcors.fiatjaf.com/?url=' + encodeURIComponent(url))
  .then(r => r.json())
  .then(data => {
    data.pub_key = nodeId;
    console.log("Lightning Node Info: ", data);
    return {
      success: true,
      data: {
        ...data,
        nodeId,
        address,
      },
    }
  }).catch(_ => {
    return {
      success: false,
      message: 'Either this identifier is not a valid node or the node is not public.',
    };
  });
};

const handleXpub = (xpubKey) => {
  // Check if Invoice starts with `xpub` prefix
  if (!xpubKey.includes(XPUB_SCHEME)) {
    return null;
  }

  // Check xPub structure
  const check = xpubKey.matches(XPUB_REGEX);
  if(check) {
    console.log("Status of xpub: ", "valid");
    return {
      success: true,
      message: 'Valid xPub',
    };
  } else {
    console.log("Status of xpub: ", "invalid");
    return {
      success: false,
      message: 'invalid xPub',
    };
  }
};

const handleBTC = (address) => {
  // Check if Invoice starts with `lnbc` prefix
  if (!address.startsWith('1') || !address.startsWith('3') || !address.startsWith('bc1')) {
    return null;
  }

  // Check xPub structure
  const check = address.matches(BTC_REGEX);
  if(check) {
    return {
      success: true,
      message: 'Valid btc address',
    };
  } else {
    return {
      success: false,
      message: 'invalid bitcoin address',
    };
  }
};

export const parseIdentifier = async (identifier) => {
    if (!identifier || identifier === '') {
        return null;
    }

    const identifierItem = identifier.trim().toLowerCase();
    let requestCode = identifierItem;

    // Parse LNURL, BOLT12, NodeID or BTC
    const isLightningAddress = requestCode.match(LIGHTNING_ADDRESS_REGEX);
    const isLNURL = requestCode.startsWith(LNURL_SCHEME);
    const isBOLT12 = requestCode.startsWith(BOLT12_SCHEME);
    const isXpub = requestCode.startsWith(XPUB_SCHEME);
    const isBTC = requestCode.startsWith('1') || requestCode.startsWith('3') || requestCode.startsWith('bc1');
    const isNode = requestCode.startsWith('02') || requestCode.startsWith('03');

    if (isLightningAddress) {
      return {
          isLightningAddress: true,
          data: handleLightningAddress(requestCode)
      }
      
  }
    if (isLNURL) {
        return {
            isLNURL: true,
            data: handleLNURL(requestCode)
        }
        
    }
    if (isBOLT12) {
        return {
            isBOLT12: true,
            data: handleBOLT12(requestCode)
        }
    }
    if (isXpub) {
        return {
            isXpub: true,
            data: handleXpub(requestCode)
        }
    }
    if (isBTC) {
      console.log("is BTC");
        return {
            isBTC: true,
            data: handleBTC(requestCode)
        }
    }
    if (isNode) {
        console.log("is Node");
        return {
            isNode: true,
            data: handleNodeID(requestCode)
        }
    }
    
}