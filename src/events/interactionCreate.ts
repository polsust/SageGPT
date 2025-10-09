import { createEvent } from "@types"
import { MessageFlags } from "discord.js"
import { ExtendedClient } from "index"

export default createEvent({
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return

    const command = (interaction.client as ExtendedClient).commands.get(
      interaction.commandName,
    )

    if (!command) {
      return console.error(
        `No command matching ${interaction.commandName} was found.`,
      )
    }

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        })
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        })
      }
    }
  },
})
