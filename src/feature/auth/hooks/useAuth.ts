import { useMutation } from "@apollo/client"
import { LOGIN_MUTATION } from "../graphql/mutations"
import { useAuthStore } from "../store/authStore"
import type { LoginInput } from "../../../types/data"

export const useAuth = () => {
    const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION)
    const { login: loginStore, ...rest} = useAuthStore();
    const login = async (credentials: LoginInput) => {
        try {
            const { data } = await loginMutation({ variables: credentials })
            loginStore(data?.login)
        } catch (error) {
            console.log(error)
        }
    }
    return { data, loading, error, ...rest, login }
}
