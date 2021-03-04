import React from "react";
import LoginForm from "./LoginForm";
import { Query } from "react-apollo";
import { Me } from "./operations.graphql";
import cs from "./styles";

const UserInfo = () => {
  return (
    <Query query={Me}>
      {({ data, loading }) => {
        if (loading || !data) return "...loading";

        if (!data.me) {
          return <LoginForm />;
        }

        const { fullName } = data.me;
        return <div className={cs.info}>👋 {fullName}</div>;
      }}
    </Query>
  );
};

export default UserInfo;
