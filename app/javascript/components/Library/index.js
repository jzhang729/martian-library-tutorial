import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const LibraryQuery = gql`
  {
    items {
      id
      title
      user {
        email
      }
    }
  }
`;

export default () => (
  <Query query={LibraryQuery}>
    {({ data, loading }) => (
      <div>
        {loading
          ? "loading..."
          : data.items.map((item) => (
              <div key={item.id}>
                <strong>{item.title}</strong>
                {item.user ? `added by ${item.user.email}` : null}
              </div>
            ))}
      </div>
    )}
  </Query>
);
