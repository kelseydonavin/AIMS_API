const { gql } = require("apollo-server");
//telling gql what our schema should look like.
const typeDefs = gql`
  type Player {
    PlayerName: String
    Time: String
    LoggedIn: String
    PlayerKilled: String
    Advancement: String
    BlockType: String
    BlocksMined: String
    MobsKilled: String
    PlayersKilled: String
    Trades: String
    TripsToNether: String
    AnimalsBred: String
  }
type Query {
    players: [Player]
  }
`;
module.exports = typeDefs;
/*    fullName: String
    email: String!
    location: String
    age: String
    citizen: Boolean*/