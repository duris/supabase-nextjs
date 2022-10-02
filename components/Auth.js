import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [signUp, setSignUp] = useState(false)
  const [signIn, setSignIn] = useState(true)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signInWithPassword({email: email, password: pass})
      if (error) throw error
      // alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async () => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signUp({email: email, password: pass})
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const showSignUp = () => {
    
    if(!signUp) {
      setSignUp(true)
      setSignIn(false)
    } else {
      setSignUp(false)
      setSignIn(true)
    }
    
  }

  return (
    <>
    
    <div className="row flex-center flex float-left">      
      {
        signIn?(
          <div className=" signIn col-6 form-widget">
        <div>          
        </div>
        {/* <p className="description">
          Sign in via magic link with your email below
        </p> */}
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
       
        <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin()
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Login'}</span>
          </button>
        </div>
      </div>
        ):
        (
          <div className="signUp col-6 form-widget float-left">        
        {/* <p className="description">
          Sign in via magic link with your email below
        </p> */}
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
       
        <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleSignup()
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Sign Up'}</span>
          </button>
        </div>
      </div>
        )
      }      
    </div>

    <div className=' mt-20 float-left w-full inline-block'>
     {
      signIn?(
        <button className='bg-blue-200 h-10 p-2 mb-2' onClick={showSignUp}>Create an Account</button>
      ):(
        <button className='bg-blue-200 h-10 p-2 mb-2' onClick={showSignUp}>Sign In</button>
      )
     }
     </div>
    </>
  )
}