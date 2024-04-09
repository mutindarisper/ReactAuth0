import { useEffect, useRef, useState } from 'react'
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { Button } from 'primereact/button';

import { InputText } from 'primereact/inputtext';

import { supabase } from './lib/helper/supabaseClient';

import './App.css'
import Todo from './components/Todo';
import AuthLogin from './components/auth0/AuthLogin';
import AuthProfile from './components/auth0/AuthProfile';
import AuthLogout from './components/auth0/AuthLogout';

function App() {
  const [user, setuser] = useState(null)
 




  const loginWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }

  
 
  //get user sessions
  useEffect(() => {
    const session = supabase.auth.getSession()
    setuser(session?.user)
    console.log(session)

    const { data: authListener } = supabase.auth.onAuthStateChange((e, session) => {
      switch (e) {
        case 'SIGNED_IN':
          setuser(session?.user)

          break;
        case "SIGNED_OUT":
          setuser(null)

        default:
          break;
      }
    })

    //clear the listener when the component is resolved
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])


  return (
    <>
      {/* {user ? (
        <Todo user={user}/>
      ) :
        <div className="card flex justify-content-center">
          <Button severity="success" label="Login wih Github" onClick={loginWithGithub} />

        </div>


      } */}


      <div className="logs" style={{display:'flex', flexDirection:'row', gap:'2em', marginBottom:'4em'}}>
        <AuthLogin/>
        
        <AuthLogout />
      </div>
      <AuthProfile />

     


    </>
  )
}

export default App
