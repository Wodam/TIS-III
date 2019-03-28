const fs = require('fs');

module.exports = (app) => {

    const baseRetrieve = (dir, res) => {
        fs.readFile(dir, (err, data) => {
            if (err) throw err
            res.send(JSON.parse(data))
        });
    }

    const baseSave = (dir, req, res) => {
        fs.readFile(dir, (err, data) => {
            if(err) throw err
            data = JSON.parse(data)
            data.push(JSON.parse(req.body))
            fs.writeFile(dir, JSON.stringify(data), (err) => {
                if(err) res.status(err.statusCode).send(err.message)
                else res.status(200)
            })
        })
    }

    const formsDataDir = 'libs/data/forms.json'

    app.get('/forms/retrieve', (req, res) => {
        baseRetrieve(formsDataDir, res)
    })

    app.post('/forms/save', (req, res) => {
        baseSave(formsDataDir, req, res)
    })

    // app.delete('/forms/delete', (req, res) => {
    //     const formsDataDir = 'data/forms.json' 
    //     baseRetrieve(formsDataDir, res)
    // })
}