import { Card, Avatar, Button } from 'flowbite-react';
import { HiArrowCircleUp, HiArrowCircleDown } from 'react-icons/hi';

function ContactItem(props) {

    return (
        <li>
            <Card>
                <div className="flex justify-between">
                    <Avatar
                        img={props.image}
                        rounded={true}
                        >
                        <div className="space-y-1 font-medium dark:text-white">
                            <div>
                            {props.title}
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
        </li>
    )
}

export default ContactItem;