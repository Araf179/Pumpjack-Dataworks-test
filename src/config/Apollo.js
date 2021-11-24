import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:40097",
  cache: new InMemoryCache(),
});

export { client };
