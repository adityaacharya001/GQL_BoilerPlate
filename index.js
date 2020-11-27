const { ApolloServer } = require("apollo-server");
const { gql } = require("apollo-boost");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");

const typeDefs = gql`

type Hi{
    say: String!
}

type Query{
    sayHi: Hi
}

`;

const resolvers = {
    Query: {
        sayHi: () => ({ say: "Hi Adi!" })
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("mongodb connected");
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`server started at ${res.port}`)
    })
