export interface Upcomingelection {
    election: {
        id: string,
        name: string,
        electionDay: string,   
    },
    otherElections: [{
        id: string,
        name: string,
        electionDay: string,  
    }],
    normalizedInput: {
        locationName: string,
        line1: string,
        line2: string,
        line3: string,
        city: string,
        state: string,
        zip: string
    },
    pollingLocations: [{
        address: {
            line1: string,
            city: string,
            state: string,
            zip: string
        },
        pollingHours: string,
        
    }],
    earlyVoteSites: [{
        address: {
            line1: string,
            line2: string,
            line3: string,
            city: string,
            state: string,
            zip: string
        },
        pollingHours: string,
        startDate: string,
        endDate: string
    }],
    contests: [{
        office: string,
        candidates: [{
            name: string,
            party: string,
            candidateUrl: string,
            channels: [{
                type: string,
                id: string
            }]
        }]
    }]
    
}