import React from 'react';
import {
    BsExclamationOctagon,
    BsThreeDots,
    BsCircle,
    BsFillDatabaseFill,
    BsArrowRepeat,
} from 'react-icons/bs';
import { LuSignalHigh, LuSignalLow, LuSignalMedium } from 'react-icons/lu';

const elementToIconMapping = {
    "Urgent": BsExclamationOctagon,
    "High": LuSignalHigh,
    "Medium": LuSignalMedium,
    "Low": LuSignalLow,
    "No priority": BsThreeDots, 
    "Todo": BsCircle,
    "In progress": BsArrowRepeat,
    "Backlog": BsFillDatabaseFill,
    // Add more mappings for other elements as needed
};

export const ElementIcon=({ element }) => {
    const IconComponent = elementToIconMapping[element];

    if (!IconComponent) {
        // Handle the case when no icon is found for the element
        return null;
    }

    return (
        <div style={{position:"relative" ,display: 'inline-block' }}>
            <IconComponent size={15} />
        </div>
    );
}

