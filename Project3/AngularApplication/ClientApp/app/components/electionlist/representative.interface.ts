export interface Representative {
    normalizedInput: {
        line1: string,
        city: string,
        state: string,
        zip: string
    },
    offices: [{
        name: string,
        officialIndices: any
    }],
    officials: [{
        name: string,
        address: {
            line1: string,
            line2: string,
            city: string,
            state: string,
            zip: string
        },
        party: string,
        phones: string,
        urls: string,
        photoUrl: string,
        channels: [{
            type: string,
            id:string,
        }],
        office: string
        

    }]
}