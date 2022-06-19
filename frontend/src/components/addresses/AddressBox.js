import { Spinner, Button, Modal, Accordion } from 'flowbite-react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { HiClipboardCopy, HiLightningBolt, HiPlusCircle, HiPencilAlt } from 'react-icons/hi';
import { Link } from "react-router-dom";

const kjua = require("kjua");

const AddressBox = (props) => {

    const qrcode = kjua({
        text: props.address,
        render: "image",
        crisp: true,
        size: 300,
        fill: "#252746",
        rounded: 10,
      });

    const copyAction = (event) => {
        event.target.innerHTML = 'Copied';
        setTimeout(() => {
            event.target.innerHTML = 'Copy';
        }, 3000);
    };

    return (
        <>
            <div className="text-center">
                <p className="text-gray-600">Scan with BIP21-enabled wallet</p>
                <img className="mx-auto my-4" src={qrcode} />
                <Button color="success" text="Open Wallet" size="sm" full />

                <CopyToClipboard text={props.address}>
                    <Button color="dark" text="Copy" className="copy-button" size="xs" onClick={copyAction}>
                        <HiClipboardCopy className="h-5 w-5 mr-2" /> Copy
                    </Button>
                </CopyToClipboard>
               
            </div>
        </>
    )
}

export default AddressBox;