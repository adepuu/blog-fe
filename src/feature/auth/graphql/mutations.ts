import { gql, useMutation } from "@apollo/client";
import type { LoginInput } from "../../../types/data";

export const LOGIN_MUTATION = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
      login(input: {usernameOrEmail: $usernameOrEmail, password: $password}) {
        accessToken
        refreshToken
      }
    }   
`