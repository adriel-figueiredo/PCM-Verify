import { createCommand, } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

createCommand({
    name: "invite",
    description: "Go to any of the PCM Discord servers.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "main",
            description: "The invite code to the main server.",
            type: ApplicationCommandOptionType.String
        },
        {
            name: "appeals",
            description: "The invite code to the appeals server.",
            type: ApplicationCommandOptionType.String
        },
    ],
    async run(interaction){
        const { options } = interaction;
        console.log(options)
    }
});