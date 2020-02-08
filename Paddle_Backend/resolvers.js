const baseURL = "https://paddle-80c1e.firebaseio.com";
const userProfile = require('./userProfile')
//how we are telling gql to get the data.
const resolvers = {
    Query: {
        users: async () => {
            const data = await fetch(`${baseURL}/users.json`); // change this to our file
            const dataJson = await data.json();
            const keys = Object.keys(dataJson);
            const mapsKeys = keys.map(function (item) {
                const userData = dataJson[item];
                const graphqlUser = userProfile(userData);
                return graphqlUser;
            });
            return mapsKeys;
        }
    }
};

module.exports = resolvers;