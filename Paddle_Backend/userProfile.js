function userProfile(data) { //taking in raw data from firebase and returning javascript object 
    return {
        age: data.age,
        citizen: data.citizen,
        email: data.email,
        fullName: data.fullName,
        location: data.location
    };
}
module.exports = userProfile;
//create object like this to mimic our data saved from MC into firebase