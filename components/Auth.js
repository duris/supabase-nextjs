import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <br/>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br/>
          <br/>
          <input
            type="password"
            placeholder="Enter a pasword..."
            className="w-64 px-2 py-2 bg-slate-50 rounded outline-none font-medium text-gray-700"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}
          >
            <span className=' bg-blue-300 p-2 inline-block mt-3 rounded-md text-blue-900 hover:bg-blue-400'>{loading ? 'Loading' : 'Sign Up'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}