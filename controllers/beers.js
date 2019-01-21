module.exports = (db) => {

    let add = (request, response) => {
        db.beers.add(request, (err, result) => {
            !err ? response.status(200).send(result) : console.error(err);
        })
    }

    let getAllBeerNames = (request, response) => {
        db.beers.getAllBeerNames(request, (err, result) => {
            !err ? response.status(200).send(result) : console.error(err);
        })
    } 

    return {
        add,
        getAllBeerNames
    };
}