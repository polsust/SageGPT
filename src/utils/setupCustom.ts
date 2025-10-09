import fs from "node:fs"
import path from "node:path"
import { ExtendedClient } from "index"
import { CustomFunctionT } from "@types"

const commandsDirPath = path.join(process.cwd(), "src/custom")

export const setupCustom = (client: ExtendedClient) => {
  const files = fs
    .readdirSync(commandsDirPath)
    .filter((file) => file.endsWith(".ts"))

  for (const file of files) {
    const filePath = path.join(commandsDirPath, file)
    const main = require(filePath).default as CustomFunctionT

    main(client)
  }
}
