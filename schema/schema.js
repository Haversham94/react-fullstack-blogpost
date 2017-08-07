const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstname: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        entity: { type: GraphQLString },
        numberOfEmployee: { GraphQLInt }
    }
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                // return data
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
