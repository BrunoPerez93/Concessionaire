import { Login } from "@/components/login/Login"


const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <h1 className="font-bold md:text-4xl text-2xl">Login</h1>
      <Login />
    </div>
  )
}

export default LoginPage

