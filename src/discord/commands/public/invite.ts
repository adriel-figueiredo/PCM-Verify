import { createCommand, } from "#base";
import { env } from "#env";
import { databaseGet, DoingVerify } from "#functions";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
const MAIN_SERVER = env.MAIN_SERVER;
const MAIN_VERIFY = env.MAIN_VERIFY;

createCommand({
    name: "invite",
    description: "Go to any of the PCM Discord servers.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "server",
            description: "The server you want to get an invite for.",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "main",
                    value: "main"
                },
                {
                    name: "support",
                    value: "support"
                }
            ]
        }
    ],
    async run(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const { options } = interaction;
        const userId = interaction.user.id;

        const server = options.getString("server", true);

        switch (server) {
            case "main":
                // Checks if user is already verified
                const isVerified = await databaseGet(`users/${userId}`)

                if (isVerified) {
                    // User is verified, invite process
                    const mainPCM = await interaction.client.guilds.fetch(MAIN_SERVER)
                    const userInPCM = await mainPCM.members.fetch(userId).catch(() => null);
                    const isInServer = userInPCM ? true : false;

                    if (isInServer) {
                        interaction.editReply("You are **already in** the PCM Main Server!");
                        return;
                    }

                    const inviteData = await mainPCM.invites.create(MAIN_VERIFY, {
                        maxUses: 1,
                        maxAge: 18,
                        unique: true,
                        reason: `Invite for verified user ${interaction.user.tag} (${interaction.user.id})`
                    });

                    interaction.editReply(`Here is the invite to the **PCM Main Server**:\n${inviteData?.url}`);
                    return;

                }

                // Checks if user has a pending verification
                const isPending = await databaseGet(`verifications/${userId}`)

                if (isPending) {
                    const verifyData: DoingVerify = isPending;
                    interaction.editReply(`You **already have** a pending verification. Go to **[PCM Lobby](https://www.roblox.com/games/107292796453428/Legends-Alexandres-Playground)** and place the following code:\n# \`${verifyData.code}\``);
                } else {
                    interaction.editReply("You need to be verified to join the PCM Main Server! Use the `/verify` command to get started.");
                }

                return;
            case "support":
                interaction.editReply("Here is an invite to the **PCM Support Server**:\nhttps://discord.gg/4pBBzA4pEU");
            default:
                return;
        }
    }
});