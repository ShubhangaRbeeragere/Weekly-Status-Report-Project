export interface previousEmployment{
    applicantName: string,
    emailAddress: string,
    employment: {
        companyName: string,
        position: string,
        startDate: string,
        endDate: string
    }[]
}
