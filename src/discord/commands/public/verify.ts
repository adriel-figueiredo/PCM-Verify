import { createCommand } from "#base";
import { ApplicationCommandType } from "discord.js";
import { databaseGet, databaseSet, codeGenerate, DoingVerify } from "#functions";

createCommand({
	name: "verify",
	description: "Registers your discord account with your roblox account.",
	type: ApplicationCommandType.ChatInput,
	async run(interaction) {
		const userId = interaction.user.id;
		await interaction.deferReply({ ephemeral: true });

		// Checks if user is already verified
		const IsVerified = await databaseGet(`users/${userId}`)
		if (IsVerified) {
			interaction.editReply("## You are **already verified**!");
			return;
		}

		// Checks if user has a pending verification
		const IsPending = await databaseGet(`verifications/${userId}`)
		if (IsPending) {
			const verifyData: DoingVerify = IsPending;
			interaction.editReply(`You **already have** a pending verification. Go to **([PCM] Lobby)[https://www.roblox.com/games/107292796453428/Legends-Alexandres-Playground]** and place the following code:\n# \`${verifyData.code}\``);
			return;
		}

		// Generate verification code and store it in database
		const code = await codeGenerate("verifications");
		await databaseSet(`verifications/${userId}`, {
			code: code,
			timestamp: Date.now()
		});

		await databaseSet(`roblox_code_lookup/${code}`, {
			id: userId
		});

		interaction.editReply(`Now to **finish** the verification, go to **([PCM] Lobby)[https://www.roblox.com/games/107292796453428/Legends-Alexandres-Playground]** and place the following code:\n# \`${code}\``);
		return;
	}
});