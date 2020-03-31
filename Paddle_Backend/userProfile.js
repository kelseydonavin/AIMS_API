function userProfile(data) { //taking in raw data from firebase and returning javascript object 
    return {
        PlayerName: data.PlayerName,
        Time: data.Time,
        LoggedIn: data.LoggedIn,
        PlayerKilled: data.PlayerKilled,
        Advancement: data.Advancement,
        BlockType: data.BlockType,
        BlocksMined: data.BlocksMined,
        MobsKilled: data.MobsKilled,
        PlayersKilled: data.PlayersKilled,
        Trades: data.Trades,
        TripsToNether: data.TripsToNether,
        AnimalsBred: data.AnimalsBred

        /* OLD STRUCTURE...
        age: data.age,
        citizen: data.citizen,
        email: data.email,
        fullName: data.fullName,
        location: data.location
        */
    };
}
module.exports = userProfile;
//create object like this to mimic our data saved from MC into firebase