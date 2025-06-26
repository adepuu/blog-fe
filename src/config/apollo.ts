import { ApolloClient, InMemoryCache } from "@apollo/client";

// TODO: Create auth link
// const link = createHttpLink({
//   uri: "http://localhost:8080/gql",
// });

const client = new ApolloClient({
  uri: "http://localhost:8080/gql",
  cache: new InMemoryCache(),
});

export default client;
