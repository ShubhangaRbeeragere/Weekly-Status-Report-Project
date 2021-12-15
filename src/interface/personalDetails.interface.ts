export interface personalData{
    applicantName: string,
    emailAddress: string,
    address: string,
    phoneNumber: {phone: string}[]
    appliedDate: string,
    appliedPosition: string,
    availableFrom: string
}

export interface phoneNumber{

}
export interface mailAndName{
    emailAddress: string,
    applicantName: string
}