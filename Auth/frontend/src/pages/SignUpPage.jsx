import { React, useState } from 'react'
import { motion } from "framer-motion"
import { User, Mail, Lock, Loader,CircleUserRound,TabletSmartphone } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"


import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import Input from '../components/Input';

import { useAuthStore } from '../store/authStore.js';

const SignUpPage = () => {

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [role, setrole] = useState('')
  const [mobile, setmobile] = useState('')

  const navigate = useNavigate()

  const {signup,error,isLoading} = useAuthStore()

  const handleSignUp = async(e) => {
    e.preventDefault();
    try {
      await signup(email,password,name,role,mobile)
      navigate('/mechanicregestration')
    } catch (error) {
      toast.error(error.message || "Error in signing up..")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >

      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type='text'
            placeholder='Enter Full Name'
            value={name}
            onChange={
              (e) => {
                setname(e.target.value)
              }
            }
            textTypeVal = "true"
          />
          <Input
            icon={Mail}
            type='email'
            placeholder='Enter Email Address'
            value={email}
            onChange={
              (e) => {
                setemail(e.target.value)
              }
            }
            textTypeVal = "true"
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={
              (e) => {
                setpassword(e.target.value)
              }
            }
            textTypeVal = "false"
          />

{/* <Input
            icon={CircleUserRound}
            type='text'
            placeholder='Enter Role'
            value={role}
            onChange={
              (e) => {
                setrole(e.target.value)
              }
            }
            textTypeVal = "true"
          /> */}

          <div className="relative mb-6">
            <label htmlFor="role" className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setrole(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
            >
              <option value="" disabled>Select Role</option>
              <option value="mechanic">Mechanic</option>
              <option value="customer">Customer</option>
            </select>
          </div>

<Input
            icon={TabletSmartphone}
            type='text'
            placeholder='Enter Mobile Number'
            value={mobile}
            onChange={
              (e) => {
                setmobile(e.target.value)
              }
            }
            textTypeVal = "true"
          />

          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          <PasswordStrengthMeter password={password} />

          <motion.button
            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled = {isLoading}    
          >
            {isLoading ? <Loader className='animate-spin mx-auto'/> : "Sign Up"}

          </motion.button>

        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Already have an account?{" "}
          <Link to={"/login"} className='text-green-400 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default SignUpPage
