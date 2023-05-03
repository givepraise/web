/**
 * Generate an link bot message that will be signed by the frontend user, and validated by the api
 *
 * @param  {string} nonce
 * @param  {string} communityId
 * @param  {string} guildId
 * @returns string
 */
export const generateLinkBotMessage = (
  nonce: string,
  communityId: string,
  guildId: string
): string => {
  return (
    'SIGN THIS MESSAGE TO LINK THE PRAISE DISCORD BOT TO YOUR COMMUNITY.\n\n' +
    `DISCORD GUILD ID:\n${guildId}\n\n` +
    `PRAISE COMMUNITY ID:\n${communityId}\n\n` +
    `NONCE:\n${nonce}`
  )
}
