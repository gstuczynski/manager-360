import React, { Component } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Query
            query={gql`
              {
                items {
                  id
                  img
                  desc
                }
              }
            `}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error}</p>;
              return data.items.map(item => {
                return (
                  <div key={item.id}>
                    <p>id: {item.id}</p>
                    <p>img: {item.img}</p>
                    <p>desc: {item.desc}</p>
                  </div>
                );
              });
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
