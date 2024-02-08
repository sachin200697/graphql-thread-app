import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import GraphQL from './components/GraphQL';

const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>      
      <GraphQL />
    </ApolloProvider>
  );
}

export default App;
