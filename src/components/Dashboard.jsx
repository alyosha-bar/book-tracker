import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";


const Dashboard = () => {

    const [percent, setPercent] = useState();

    const { user } = useContext(UserContext)

    useEffect( () => {
        
        const fetchPercent = () => {
            fetch(`/api/dash/percentage/${user.User_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then( (res) => {
                if (!res.ok) {
                    // throw new Error("")
                    console.log("not chilling")
                }
                return res.json()
            }).then( (data) => {
                console.log(data)
                setPercent(data.Percentage)
            }).catch( (err) => {
                throw new Error(err)
            })
        }

        fetchPercent()


    }, [user])

    return ( 
        <div className="dash-page">
            <h1>Dashboard Page</h1>
            {percent && (
                <div> {percent}% read </div>
            )}
        </div>
     );
}
 
export default Dashboard;