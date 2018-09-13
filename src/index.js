#! /usr/bin/env node

const GraphQLTransform = require('graphql-transformer-core').default;
const {DynamoDBModelTransformer} = require('graphql-dynamodb-transformer');
const {ModelConnectionTransformer} = require('graphql-connection-transformer');
const {ModelAuthTransformer} = require('graphql-auth-transformer');
const {SearchableModelTransformer} = require('graphql-elasticsearch-transformer');
const {AppSyncTransformer} = require('graphql-appsync-transformer');
const fs = require('fs-extra');

// Todo: actual cli parsing would be good
const schemaPath = process.argv[2];
const schema = fs.readFileSync(schemaPath, 'utf-8');

// console.log(process.argv)
const transformer = new GraphQLTransform({
    transformers: [
        new AppSyncTransformer(),
        new DynamoDBModelTransformer(),
        new ModelAuthTransformer(),
        new ModelConnectionTransformer(),
        new SearchableModelTransformer()
    ]
})
const cfdoc = transformer.transform(schema);
console.log(JSON.stringify(cfdoc, null, 2))