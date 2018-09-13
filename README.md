# appsync-cloudformation-transformer-cli

An easy to use cli for graphql sdl for appsync to cloudformation transforms.

# Usage

`npm i -g appsync-cloudformation-transformer-cli`  
`pip install --user cfn_flip` optional but nice for easier to read cfn

Example Schema:

```graphql
type Post @model @searchable {
    id: ID!
    title: String!
    tags: [String]
    comments: [Comment] @connection
    createdAt: String
    updatedAt: String
}
type Comment @model {
    id: ID!
    content: String!
}
```

Then run `act schema.graphql` or if you want a yaml version saved to a file simply `act schema.graphql | cfn-flip > template.yaml`
