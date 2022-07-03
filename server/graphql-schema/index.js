const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');
const clientModel = require('../model/client');
const { MSG } = require('../config/constant');

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // return all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => {
        return clientModel.find();
      },
    },
    // return single client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parents, args) => {
        return clientModel.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // add client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parents, args) => {
        const isExist = await clientModel.find({ email: args.email });

        if (isExist.length) {
          throw new Error(MSG.CLIENT_ALREADY_EXIST);
        }

        const client = new clientModel({
          name: args.name,
          email: args.email,
          age: args.age,
        });

        return client.save();
      },
    },
    // update client
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: (parents, args) => {
        const { id, name, email, age } = args;
        return clientModel.findByIdAndUpdate(
          id,
          { $set: { name, email, age } },
          { new: true }
        );
      },
    },
    // delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parents, args) => {
        return clientModel.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
