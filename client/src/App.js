import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query, Mutation } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const onDropImg = file => {
  console.log(file);
};

// const saveItem = file => {
//   console.log("dupa", file);
//   const saveItemMutation = gql`
//     mutation itemSave($img: String, $desc: String, $file: Upload) {
//       itemSave(img: $img, desc: $desc, file: $file) {
//         img
//         desc
//       }
//     }
//   `;

const UPLOAD_FILE = gql`
  mutation itemSave($file: Upload!) {
    itemSave(file: $file) {
      filename
    }
  }
`;

// client
//   .mutate({
//     mutation: saveItemMutation,
//     variables: { img: "asdjlaksjdasjdkaslkd", desc: "121312334324", file }
//   })
//   .then(res => {
//     console.log(res);
//   });

export default () => {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    //saveItem(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <ApolloProvider client={client}>
      <Mutation mutation={UPLOAD_FILE}>
        {itemSave => (
          <input
            type="file"
            required
            onChange={({
              target: {
                validity,
                files: [file]
              }
            }) => itemSave({ variables: { file } })}
          />
        )}
      </Mutation>
    </ApolloProvider>
  );
};
