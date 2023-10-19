import React from 'react'
import { useSelector } from "react-redux";
import { ElementIcon } from './ElementIcon';

//get groupBy filter status from local storage
const getGroup = () => {
    if (localStorage.getItem("group")) {
        return localStorage.getItem("group");
    } else {
        return "status";
    }
}

export const Card = ({ id, title, tag, name, users }) => {
    const { tickets, user } = useSelector((state) => state.dataSlice);
    const arr = ["No priority", "Low", "Medium", "High", "Urgent"];
    const groupBy = getGroup();
    const userIds = name?.split("-")[1] - 1;
    const ticketIds = id?.split("-")[1] - 1;
    const val = users[userIds];
    // Generate initial letters for the user
    const initial = val ? val.name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("") : "U";
    const ticketStatus = tickets[ticketIds]?.status;


    return (
        // Card Component
        <div className="card flex-gap-10" style={{ gap: '5px' }}>
            <div className="flex-sb">
                {groupBy == "priority" &&
                    <ElementIcon element={ticketStatus} />
                }
                <span style={{ color: "grey" }}>{id}</span>
                {/* Initial to be used here if user is false*/}
                {
                    !user && (
                        <div style={{ position: "relative", width: "30px", height: "30px" }}>
                            <img style={{ width: "100%", height: "100%", borderRadius: "50%" }} src={`https://ui-avatars.com/api/?name=${initial}&size=100&background=random&color=fff&rounded=true`}
                                alt="User" />
                        </div>
                    )
                }

            </div>
            <div style={{ fontWeight: 200 }} >
                <p>{title}</p>
            </div>
            <div className="cardTags">
                {/* Display priority icon for non-priority grouping */}
                {groupBy != "priority" && <div className="tags">
                    <ElementIcon element={arr[tickets[ticketIds]?.priority]} />
                </div>}
                {
                    tag?.map((elem, index) => {
                        return <div key={index} className="tags" style={{ color: "grey" }}> <span>•</span> {elem}</div>
                    })
                }
            </div>
        </div>
    )
}
