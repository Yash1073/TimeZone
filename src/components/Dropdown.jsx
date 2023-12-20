import React, { useState } from 'react';
import { MdCalendarMonth } from 'react-icons/md';

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);

    
    const options = [
        {
            "text": "Google",
            "link": "https://www.google.com/calendar/render?action=TEMPLATE&text=Your+Event+Title&dates=StartDateTime/EndDateTime",
            "icon": "data:image/png;base64,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",
            "id": 1
        },
        {
            "text": "iCal",
            "link": "webcal://p04-calendarws.icloud.com/ca/subscribe/1/YourEventUniqueIdentifier.ics",
            "icon": "https://cdn-icons-png.flaticon.com/512/152/152752.png",
            "id": 2
        },
        {
            "text": "Outlook",
            "link": "https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&startdt=StartDateTime&enddt=EndDateTime&subject=Your+Event+Title&location=EventLocation",
            "icon": "data:image/jpeg;base64,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",
            "id": 3
        },
        {
            "text": "Yahoo!",
            "icon": "https://cdn.icon-icons.com/icons2/1508/PNG/512/yahoo_103883.png",
            "id": 4,
            "link": "https://calendar.yahoo.com/?v=60&view=d&type=20&title=Your+Event+Title&st=StartDateTime&et=EndDateTime"
        }
    ];


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="relative inline-block">
            <button onClick={toggleDropdown} className="flex items-center space-x-2">
                <MdCalendarMonth className="text-xl" />
            </button>
            
            {isOpen && (
                <ul className="absolute z-10 mt-7 mr-40 py-2 w-32 bg-white border border-black  rounded shadow-slate-50">
                    {options.map((option, index) => (
                        <li key={index} className=" m-0 px-4 py-2">
                            {/* hover:bg-gray-100 */}
                            <div >
                                <a href={option.link} target='__blank'  >
                                    <div className='flex flex-row gap-2 items-center border-b-4 border-black-100  hover:bg-gray-300'>
                                        <span className='black'>{option.text}</span>
                                        <img className='justify-self-end' src={option.icon} height={20} width={15} />
                                    </div>

                                </a>

                            </div>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;
