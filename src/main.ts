import { Client, Collection, REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import { ISlashCommand } from './type'
import path from 'path'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()
const commands = new Collection<string, ISlashCommand>()

const client = new Client({
  intents: ['GuildMembers', 'GuildMessages', 'GuildMessageReactions'],
})

client.on('ready', async () => {
  console.log('Command loading...')
  const commandsPath = path.join(__dirname, 'commands')
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'))
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!)
  const clientId = client.user?.id || ""
  const guildIds = ["827355485644128306", "881924651142479892"]
  let succeededCount = 0
  let failedCount = 0

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    try {
      const command = (await import(filePath)).default as ISlashCommand
      commands.set(command.name, command)
      console.log(`Command load successful: ${command.name}`)
      succeededCount++
    } catch (e) {
      console.log(`Command load error: ${file}`)
      console.log(e)
      failedCount++
    }
  }

  console.log(
    `Command loading completed!\nBot has ${commandFiles.length} commands\nSucceeded: ${succeededCount}\nFailed: ${failedCount}`
  )
  console.log(client.user?.username)
  const guildCommandJSON: RESTPostAPIApplicationCommandsJSONBody[] = []
  const globalCommandJSON: RESTPostAPIApplicationCommandsJSONBody[] = []
  commands.forEach((v, i) => {
    if (v.guildOnly) {
      guildCommandJSON.push(v.command.toJSON())
    } else {
      globalCommandJSON.push(v.command.toJSON())
    }
  })

  for (const gid of guildIds) {
    await rest.put(
      Routes.applicationGuildCommands(clientId, gid),
      { body: guildCommandJSON }
    )
  }

  await rest.put(
    Routes.applicationCommands(clientId),
    { body: globalCommandJSON }
  )
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const command = commands.get(interaction.commandName)
  if (command) {
    try {
      await command.execute(interaction)
    } catch (e) {
      interaction.reply({ content: `Command execute error!\n${e}` })
    }
  } else {
    interaction.reply({ content: 'Command not found!' })
  }
})

client.login(process.env.TOKEN)
