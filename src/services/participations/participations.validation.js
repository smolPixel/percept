

module.exports = {
    properties:{
        "finished":{type: "boolean"},
        data: {
            anyOf:[
                {
                    type:"array"
                },
                {
                    type: "object"
                }
            ]

        }
    }
}