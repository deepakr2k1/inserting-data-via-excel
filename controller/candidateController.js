const Candidate = require('../models/candidate')
const xlsxtojson = require("xlsx-to-json-lc");
const path = require('path');
var fs = require('fs');

front_page = (req, res) => {
    res.render('index', { msg: "none" })
}

insertToDB = async(new_candidate) => {
    await new_candidate.save()
        .then(async() => {
            return Promise.resolve("Inserted");
        })
}

uploadDoucument = async(new_candidate) => {
    var cand = await Candidate.findOne({ email: new_candidate["email"] })
    if (!cand) {
        await insertToDB(new_candidate);
    }
}

uploadListOfDocuments = async(data) => {
    for (var cand of data) {
        var new_candidate = new Candidate(cand);
        await uploadDoucument(new_candidate);
    }
}

upload_file = async(req, res) => {
    var filePath = path.join(__dirname, "..", "uploads", req.file.filename);
    var outputPath = path.join(__dirname, "..", "uploads", "output.json");
    xlsxtojson({
        input: filePath,
        output: outputPath,
        lowerCaseHeaders: true,
    }, async function(err, result) {
        if (err) {
            console.log(err)
            res.render('index', { msg: "failed" });
        } else {
            var data = [];
            result.forEach((cand, ind) => {
                if (cand['name of the candidate'] != "" && cand['name of the candidate'] != null && cand['email'] != "" && cand['email'] != null) {
                    cand['mobile'] = cand['mobile no.'];
                    data.push(cand);
                }
            })
            fs.unlinkSync(filePath);
            await uploadListOfDocuments(data)
                .then(() => {
                    res.render('index', { msg: "success" });
                })
                .catch(async(err) => {
                    res.render('index', { msg: "failed" });
                })
        }
    });
}

module.exports = {
    'front_page': front_page,
    'upload_file': upload_file,
}