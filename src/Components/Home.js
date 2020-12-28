import React,{ useEffect,useState} from 'react'

export default function Home() {
const [currenUser, setCurrenUser] = useState(null);
    useEffect(() => {
      
        let user = JSON.parse(localStorage.getItem("crntUser"));

        setCurrenUser(user)
        console.log(user);


    }, [])
    return (
        <div>
          {
              currenUser !== null && 
              <div>
                  Welcome {currenUser.firstName +"  " + currenUser.lastName  }

              </div>
          }
        </div>
    )
}
