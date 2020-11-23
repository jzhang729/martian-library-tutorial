import React, { useState } from "react";
import { Query } from "react-apollo";
import { LibraryQuery } from "./operations.graphql";
import cs from "./styles";
import UpdateItemForm from "../UpdateItemForm";

const Library = () => {
  const [item, setItem] = useState(null);

  const renderItems = (items) => {
    return items.map(({ title, description, imageUrl, id, user }) => {
      return (
        <button
          key={id}
          className={cs.plate}
          onClick={() =>
            setItem({
              title,
              imageUrl,
              id,
              description
            })
          }
        >
          <div className={cs.title}>{title}</div>
          <div>{description}</div>
          {imageUrl && <img src={imageUrl} className={cs.image} />}
          {user ? <div className={cs.user}>added by {user.email}</div> : null}
        </button>
      );
    });
  };

  return (
    <Query query={LibraryQuery}>
      {({ data, loading }) => {
        if (loading) return "Loading...";

        return (
          <div className={cs.library}>
            {renderItems(data.items)}
            {item !== null && (
              <UpdateItemForm
                id={item.id}
                initialTitle={item.title}
                initialDescription={item.description}
                initialImageUrl={item.imageUrl}
                onClose={() => setItem(null)}
              />
            )}
          </div>
        );
      }}
    </Query>
  );
};

export default Library;
