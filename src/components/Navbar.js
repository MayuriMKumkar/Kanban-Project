import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectData } from '../redux/action';
import { BsFilterLeft } from "react-icons/bs"

//get groupBy filter status from local storage
const getGroup = () => {
    if (localStorage.getItem("group")) {
        return localStorage.getItem("group");
    } else {
        return "status";
    }
};

//get orderBy filter status from local storage
const getOrder = () => {
    if (localStorage.getItem("order")) {
        return localStorage.getItem("order");
    } else {
        return "priority";
    }
};


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { tickets, users } = useSelector((state) => state.dataSlice);
    const [groupBy, setGroupBy] = useState(getGroup());
    const [orderBy, setOrderBy] = useState(getOrder());

    const formRef = useRef(null);

    // Function to handle changes in grouping and ordering options
    const handleGroups = (e, value) => {
        setIsOpen(!isOpen);
        if (value) {
            setGroupBy(e.target.value);
            localStorage.setItem("group", e.target.value); //storing grouping option in localStorage
        } else {
            setOrderBy(e.target.value);
            localStorage.setItem("order", e.target.value); //storing order option in localStorage
        }
    };

    useEffect(() => {
        if (groupBy === "user") {
            dispatch(selectData(groupBy, { tickets, users }, orderBy));
        }
        else {
            dispatch(selectData(groupBy, tickets, orderBy));
        }
    }, [dispatch, tickets, groupBy, users, orderBy]);

    useEffect(() => {
        // Add event listener to detect clicks outside the form
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ paddingLeft: "10px", margin: "10px" }}>
            <div className="display-options" ref={formRef}>
                <button
                    className="display-btn"
                    style={{ fontSize: "16px", padding: "5px 10px" }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <BsFilterLeft />
                    &nbsp;
                    Display
                </button>
                {isOpen && (
                    <>
                        <div className="dropdown-options flex-gap-10" style={{ padding: "5px 10px" }}>
                            <div className="group-select flex-sb">
                                <span>Grouping</span>
                                <select
                                    value={groupBy}
                                    onChange={(e) => handleGroups(e, true)}
                                    className="select-style"
                                    name="group"
                                    id="group"
                                >
                                    <option value="status">Status</option>
                                    <option value="user">User</option>
                                    <option value="priority">Priority</option>
                                </select>
                            </div>
                            <div className="flex-sb">
                                <span>Ordering</span>
                                <select
                                    value={orderBy}
                                    onChange={(e) => handleGroups(e, false)}
                                    className="select-style"
                                    name="order"
                                    id="order"
                                >
                                    <option value="priority">Priority</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

}

export default Navbar