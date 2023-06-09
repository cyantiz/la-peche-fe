export function userIds2ChatGroupId(userIds: string[]) {
    return userIds.sort().join('-')
}
