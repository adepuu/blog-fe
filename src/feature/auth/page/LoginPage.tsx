import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

type LoginFormFields = {
  usernameOrEmail: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth()
  const { handleSubmit, register } = useForm<LoginFormFields>({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  return (
    <div>
      <form className="flex flex-col gap-4 p-8" onSubmit={handleSubmit((data: LoginFormFields) => {
        login(data)
      })}>
        <input placeholder="Username or email" type="text" {...register('usernameOrEmail')} className="border border-gray-300 rounded px-2 py-1" />
        <input placeholder="Password" type="password" {...register('password')} className="border border-gray-300 rounded px-2 py-1" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  ) 
}

export default LoginPage
