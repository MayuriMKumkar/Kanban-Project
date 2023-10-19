import React from 'react'
import { useSelector } from "react-redux";
import { Card } from './Card'
import {ElementIcon} from './ElementIcon';

const Board = () => {
    const {tickets, dataSelected, user,users } = useSelector((state) => state.dataSlice);
    // const userIds = dataSelected?.map((data) => parseInt(data.userId?.split("-")[1] - 1));
    
    // console.log(userIds);
    // console.log(dataSelected);
    // console.log(users);
    return (
        <>
            <div className="container" style={{ paddingTop:"10px",justifyContent: "space-evenly" }}>
                {dataSelected?.map((item, index) => {
                    // console.log(item);
                    return (
                        <>
                            <div key={index} className="dashboardContainer">
                                <div className="flex-sb">
                                    <div >
                                        {!user ? (
                                            <ElementIcon element={ item[index]?.title }/>
                                        ) : (
                                            <>
                                                    <div
                                                        style={{ position:"relative", width: "15px", height: "15px", display: 'inline-block', paddingRight:"5px" }}
                                                    >
                                                        <img
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                borderRadius: "50%",
                                                            }}
                                                            src={`https://ui-avatars.com/api/?name=${item[index]?.title.split(" ")
                                                                .map((n) => n[0].toUpperCase())
                                                                .join("") }&size=100&background=random&color=fff&rounded=true&font-size=0.7`} 
                                                            alt="User"
                                                        />
                                                        </div>
                                            </>
                                        )}
                                        <span style={{fontWeight:"600"}}>
                                            {" "}
                                             {item[index]?.title} 
                                        </span>
                                    </div>
                                    <div >
                                        <button style={{ fontWeight:"bold", paddingRight:"10px", background:"transparent", border:"none"}}>+</button>
                                        <button style={{ letterSpacing: "2px", fontWeight: "bold", paddingRight: "10px", background: "transparent", border: "none" }}>...</button>
                                    </div>
                                </div>
                                <div className="flex-gap-10">
                                    {item[index]?.value?.map((it, ind) => {
                                        return (
                                            <Card id={it.id} title={it.title} tag={it.tag} user={user} name = {it.userId} users = {users} />
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>

        {/* <Card id={"1"} title={"Amiyanshu"} tag={["User Priority"]} user={"Nik"} /> */}
       </>
    )
}

export default Board