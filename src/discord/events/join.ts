import { createEvent } from "#base";
import { env } from "#env";
import { databaseGet } from "#functions";
const MAIN_SERVER = env.MAIN_SERVER;

createEvent({
    name: "join",
    event: "guildMemberAdd",
    async run(member) {
        if (member.guild.id !== MAIN_SERVER) return;
        const isVerified = await databaseGet(`users/${member.id}`)
        if (!isVerified) {
            console.log(`User is not verified: ${member.user.username} (${member.id})`)
            // member.kick("User is not verified in the PCM database.");
        }
    }       
});