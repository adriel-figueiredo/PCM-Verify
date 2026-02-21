import { createCommand } from "#base";
import { codeGenerate, databaseGet, databaseSet, DoingVerify } from "#functions";
import { ApplicationCommandType } from "discord.js";

createCommand({
	name: "verify",
	description: "Registers your discord account with your roblox account.",
	type: ApplicationCommandType.ChatInput,
	async run(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const userId = interaction.user.id;

		// Checks if user is already verified
		const isVerified = await databaseGet(`users/${userId}`)
		if (isVerified) {
			interaction.editReply("## You are **already verified**!");
			return;
		}

		// Checks if user has a pending verification
		const isPending = await databaseGet(`verifications/${userId}`)
		if (isPending) {
			const verifyData: DoingVerify = isPending;
			interaction.editReply(`You **already have** a pending verification. Go to **[PCM Lobby](https://www.roblox.com/games/107292796453428/Legends-Alexandres-Playground)** and place the following code:\n# \`${verifyData.code}\``);
			return;
		}

		// Generate verification code and store it in database
		const code = await codeGenerate("verifications");
		await databaseSet(`verifications/${userId}`, {
			code: code,
			timestamp: Date.now()
		});

		// Roblox code lookup for easy searching
		await databaseSet(`roblox_code_lookup/${code}`, {
			id: userId
		});

		interaction.editReply(`Now to **finish** the verification, go to **[PCM Lobby](https://www.roblox.com/games/107292796453428/Legends-Alexandres-Playground)** and place the following code:\n# \`${code}\``);
		return;
	}
});