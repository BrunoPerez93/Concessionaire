import { Login } from "@/components/login/Login"

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <div className="bg-slate-200 w-1/3 flex flex-col justify-center items-center p-5 rounded-xl">
        <h1 className="font-bold md:text-4xl text-2xl">Login</h1>
        <Login />
      </div>
    </div>
  )
}

export default LoginPage

