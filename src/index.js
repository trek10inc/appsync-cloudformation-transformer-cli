#! /usr/bin/env node

const GraphQLTransform = require('graphql-transformer-core').default;
const {DynamoDBModelTransformer} = require('graphql-dynamodb-transformer');
const {ModelConnectionTransformer} = require('graphql-connection-transformer');
const {ModelAuthTransformer} = require('graphql-auth-transformer');
const {SearchableModelTransformer} = require('graphql-elasticsearch-transformer');
const {AppSyncTransformer} = require('graphql-appsync-transformer');
const {VersionedModelTransformer} = require('graphql-versioned-transformer');
const {DefaultValueTransformer} = require('graphql-default-value-transformer');
const fs = require('fs-extra');

// Todo: actual cli parsing would be good
const schemaPath = process.argv[2];
const schema = fs.readFileSync(schemaPath, 'utf-8');

const transformers = [
    new AppSyncTransformer(),
    new DynamoDBModelTransformer(),
    new ModelConnectionTransformer(),
    new VersionedModelTransformer(),
    new DefaultValueTransformer()
]

// Only insert certain plugins if needed, otherwise they pollute the cloudformation
// for no good reason.
// We determine if needed with a simple string search for the directive string
function conditionalInsertDirectivePlugin(plugin, searchString){
    if (schema.indexOf(searchString) >= 0) {
        transformers.push(plugin)
    }
}

conditionalInsertDirectivePlugin(new ModelAuthTransformer(), '@auth');
conditionalInsertDirectivePlugin(new SearchableModelTransformer(), '@searchable');

// console.log(process.argv)
const transformer = new GraphQLTransform({
    transformers: transformers
})

const cfdoc = transformer.transform(schema);
console.log(JSON.stringify(cfdoc, null, 2))