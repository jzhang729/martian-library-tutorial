import React, { useRef } from "react";
import { Mutation } from "react-apollo";
import { Me, SignMeIn } from "./operations.graphql";
import cs from "./styles";

const LoginForm = () => {
  const input = useRef(null);

  return (
    <Mutation
      mutation={SignMeIn}
      update={(cache, { data: { signIn } }) => {
        cache.writeQuery({
          query: Me,
          data: { me: signIn.user }
        });
      }}
    >
      {(signIn, { loading: authenticating }) =>
        authenticating ? (
          "..."
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              signIn({
                variables: { email: input.current.value }
              }).then(
                ({
                  data: {
                    signIn: { token }
                  }
                }) => {
                  if (token) {
                    localStorage.setitem("mlToken", token);
                  }
                }
              );
            }}
          >
            <input
              ref={input}
              type="email"
              className={cs.input}
              placeholder="your email"
            />
            <input type="submit" value="Sign In" />
          </form>
        )
      }
    </Mutation>
  );
};

export default LoginForm;
