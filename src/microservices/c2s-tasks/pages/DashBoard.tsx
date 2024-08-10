import { useEffect, useState } from "react";

export default function DashBoard(){

    useEffect(()=>{

        function fetchTasks(){
            console.log("fetchTasks >>>>")
        }

        fetchTasks();

    },[])

    return(
        <h1>
            DashBoard
        </h1>
    )
}