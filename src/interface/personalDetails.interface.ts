//interface for the data received
export interface applicantDetails
{
 personalDetails: {
        applicantName: string,
        emailAddress: string,
        address: string,
        phone: {number : string}[],
        appliedDate: string,
        appliedPosition: string,
        availableFrom: string 
    },
    education: {
            institution: string ,
            degree: string,
            specialization: string,
            startDate: string,
            endDate: string 
        }[],
    previousEmployment :{
            company: string,
            position: string,
            startDate: string,
            endDate: string 
    }[]
}

export interface personalData{
    applicantName: string,
    emailAddress: string,
    address: string,
    appliedDate: string,
    appliedPosition: string,
    availableFrom: string
}

export interface mailAndName{
    emailAddress: string,
    applicantName: string
}