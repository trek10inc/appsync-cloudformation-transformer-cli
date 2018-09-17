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
    tagline: @default(value: "It's like X for Y")
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

# Custom Directives

We have added, and plan to continue adding, custom directives to make this a powerful abstraction layer.

## Default field value directive

You can set a field value to a specific thing if it is otherwise undefined via the `@default` directive. It will properly handler coercion to the correct type for Int as well, even though you define the value in a string.

```graphql
type Post {
    id: ID!
    title: String @default(value: "Your Example Title")
    viewCount: Int @default(value: "9001")
}
```