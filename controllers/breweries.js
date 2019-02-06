const
    Brewery = require('../models/Brewery.js');
    User = require('../models/User.js');

module.exports = {
    index: (req, res) => {
        Brewery.find({}, (err, breweries) => {
            if (err) res.json({ success: false, err })
            res.json({ success: true, breweries })
        })
    },

    create: (req, res) => {
        console.log(req.body)
        Brewery.create(req.body, (err, newBrewery) => {
            if (err) res.json({ success: false, err })
            res.json({ success: true, newBrewery })
            // push the users id into the created breweries user array
            newBrewery.users.push(req.user.id)
           
            // save the new brewery with the user's id
            newBrewery.save(err => {
                // returns the brewery obj with current user's id in the breweries users array
                // if it saves, push the brewery's id into the users favorites array
                // res.json({success: true, addedUserToBrewery})

                User.findById(req.user.id, (err, user) => {
                    console.log(newBrewery)
                    // what we want is to push newBrewery brew_id so we can ping 4square API
                    user.favorites.push(newBrewery.brewId)
                    user.save(err => {
                        console.log('User added this brewery successfully.')  
                    })
                })
            })
                        
        })
    },

    show: (req, res) => {
        // This is searching our DB for brewery by it's API brewery id
        Brewery.find({ brewId: req.params.id }, (err, brewery) => {
            if (err) res.json({ success: false, err })
            res.json({ success: true, brewery })
        })
    },

    update: (req, res) => {
            let user_id = req.user.id
            let brewId = req.params.id
        Brewery.find({ brewId: req.params.id}, (err, brewery) => {
            let foundBrewery = brewery[0]
            if (err) res.json({ success: false, err })
            // Check if user has already liked this brewery (see if userId exists in Brewery users' array)
            let foundUser = foundBrewery.users.find( id => id == user_id);
            if (foundUser) {
                let index = foundBrewery.users.indexOf(user_id)
                console.log(index)
                foundBrewery.users.splice(index, 1)
                // Set logic to UNLIKE brewery
                // Remove user's ID from brewery's users array
                foundBrewery.save(err => {
                    if (err) res.json({ success: false, err })
                    console.log('User has been removed from this brewery.')
               
                // Remove brewId from User's favorites array
                User.findById(user_id, (err, user) => {
                    if (err) res.json({ success: false, err })
                    let brewIndex = user.favorites.indexOf(brewId)
                    console.log(brewIndex)
                    user.favorites.splice(brewIndex, 1)
                    user.save(err => {
                        if (err) res.json({ success: false, err})
                        console.log('Brewery has been unliked.')
                    })
                })
            })
           
        // Push user's id into brewery users' array
            } else { 
                // Add user_id to the brewery's users array
                foundBrewery.users.push(user_id);

                // Save brewery with added user's id
                foundBrewery.save( err => {
                    // Find User's id
                    User.findById(user_id, (err, user) => {
                        // Check if the brewery id is in the user's favorites array
                        let foundBrewery = user.favorites.find( id => id == brewId)
                        if (foundBrewery) console.log("User already liked this brewery");
                        // // Push brewery's id to user's favorites array
                        else user.favorites.push(brewId);
                        // Save user's favorites array with added brewery id
                        user.save(err => {
                            console.log({message: `Brewery added to user's favorites array successfully`})
                        })
                    })
                })
            }
        })
    },
    

    destroy: (req, res) => {
        Brewery.findByIdAndRemove(req.params.id, (err, deletedBrewery) => {
            if (err) res.json({ success: false, err })
            res.json({ success: true, deletedBrewery })
        })
    }
}
