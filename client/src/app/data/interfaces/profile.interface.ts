export interface Profile{
    id: number,
    username: string,
    avatarUrl: string,
    subscriptionsAmount: number,
    firstName: string,
    lastName: string,
    isActive: boolean,
    stack: string[],
    description: string,
    city: string
}