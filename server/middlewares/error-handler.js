function handleErrors(error, req, res, next) { //something went wrong on the server and we are not able to recover from it
    console.log(error);

    if (error.code === 404) {
        return res.status(404).json({ message: 'Not Found' });
    }

    res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = handleErrors;