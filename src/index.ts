import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";
import "reflect-metadata";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(3001, () => {
    console.log("Server started on http://localhost:3001/graphql");
  });
};

main();
