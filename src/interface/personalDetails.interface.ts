export interface personalData{
    applicantName: string,
    emailAddress: string,
    address: string,
    phoneNumber: {number: string}[]
    appliedDate: string,
    appliedPosition: string,
    availableFrom: string
}
export interface mailAndName{
    emailAddress: string,
    applicantName: string
}