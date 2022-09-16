import findPackages from "find-packages"
import { promises as fs } from "fs"

async function main() {
  const pkgs = await findPackages("packages")
  await Promise.all(
    pkgs.map(async (pkg) => {
      // check if src contains tsx files
      let data = {
        ...pkg.manifest,
        scripts: {
          ...pkg.manifest.scripts,
        },
        "clean-package": "../../../clean-package.config.json",
      }

      fs.writeFile(`${pkg.dir}/package.json`, JSON.stringify(data, null, 2))
    }),
  )
}

main()
