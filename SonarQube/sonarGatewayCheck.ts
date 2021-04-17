const https = require('https');
const core = require('@actions/core');

const requsetInfo = {
    hostname: 'sonarcloud.io',
    port: 443,
    path: '/api/project_analyses/search?organization=dotnetcore-sonar&project=peace920902_Dotnet-GitFlow&catagory=QUALITY_GATE',
    method: "GET"
}
//console.log('step2');
let body = [];

const req = https.request(requsetInfo, res => {
    res.on('data', d => {
        body.push(d)
    }).on('end', () => {
        let responseBody = Buffer.concat(body).toString()
        let sonar = JSON.parse(responseBody);
        let element = findNewGateStatus(sonar);
        let gateway = element.events.find((e) => e.category == 'QUALITY_GATE');

        console.log(gateway);
        console.log(`description: ${gateway.description}`);
        let status: string = gateway.name.split(' ')[0];
        console.log(`status = ${status}`);
        if (status.toLocaleLowerCase() === "red") {
            core.setFailed("Not pass sonar gateway");
        }
    })
})
//console.log('step3');
req.on('error', error => {
    console.error(error);
    core.setFailed(error.message);
})
//console.log('step4');
req.end()
//console.log('step5');
function findNewGateStatus(json) {
    var tempTime = 0;
    var result;
    json.analyses.forEach(element => {
        var time = new Date(element.date).getTime();
        if (time > tempTime) {
            result = element;
            tempTime = time;
        }
    });
    return result;
}

