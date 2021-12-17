export interface personalDetails{
    applicantName: string,
    emailAddress: string,
    address: string,
    phone: {number: string}[],
    appliedDate: string,
    appliedPosition: string,
    availableFrom: string
}

export interface mailAndName{
    emailAddress: string,
    applicantName?: string
}