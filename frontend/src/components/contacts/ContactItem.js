import { Card, Avatar } from 'flowbite-react';
import { Link } from "react-router-dom";
import { HiArrowCircleUp, HiArrowCircleDown } from 'react-icons/hi';

function ContactItem(props) {

    return (
        <li className='mb-5'>
        <Link to={`/contacts/${props.id}`}>
            <Card>
                <div className="flex justify-between">
                    <Avatar
                        img="https://source.boringavatars.com/marble/120/1337_user?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
                        rounded={true}
                        >
                        <div className="space-y-1 font-medium dark:text-white">
                            <div>
                            {props.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                            # addresses
                            </div>
                        </div>
                    </Avatar>
                    <div className="flex justify-between">
                        <HiArrowCircleUp className="action h-8 w-8 mr-3 text-white"></HiArrowCircleUp>
                        <HiArrowCircleDown className="action h-8 w-8 mr-3 text-white"></HiArrowCircleDown>
                    </div>
                </div>
            </Card>
        </Link>
        </li>
    )
}

export default ContactItem;