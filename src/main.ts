import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

export interface IActionInputs {
  readonly strategyIniFile: string
  readonly level: string
  readonly requirementsTxtFile: string
  readonly reportingTxtFile: string
  readonly noDeps: boolean | string
}

export async function parseInputs(): Promise<IActionInputs> {
  try {
    const inputs: IActionInputs = Object.freeze({
      strategyIniFile: core.getInput('strategy-ini-file'),
      level: core.getInput('level').toUpperCase(),
      requirementsTxtFile: core.getInput('requirements-txt-file'),
      reportingTxtFile: core.getInput('reporting-txt-file'),
      noDeps: core.getInput('no-deps'),
    })
    return inputs
  } catch (error) {
    throw error
  }
}

async function run(): Promise<void> {
  try {
    const inputs = await core.group('Gathering Inputs...', parseInputs)

    await core.group('Getting python executable path ...', async () => {
      const pythonExe: string = await io.which('python', true)
      core.info(`\u001b[38;5;6mPython path: ${pythonExe}`)
      return pythonExe
    })

    const liccheckPath: string = await core.group(
      'Getting liccheck executable path ...',
      async () => {
        const liccheckExe: string = await io.which('liccheck', true)
        core.info(`\u001b[38;5;6mliccheck path: ${liccheckExe}`)
        return liccheckExe
      }
    )

    await core.group('Strategy to use...', async () => {
      await exec.exec('cat', [inputs.strategyIniFile])
    })

    await core.group('Checking licenses for ...', async () => {
      await exec.exec('cat', [inputs.requirementsTxtFile])
    })

    await core.group('Other parameters', async () => {
      core.info(`level: ${inputs.level}, no-deps: ${inputs.noDeps}`)
    })

    const commandOptions: string[] = [
      '-s',
      inputs.strategyIniFile,
      '-r',
      inputs.requirementsTxtFile,
      '-l',
      inputs.level,
    ]

    await core.group('Verifying the licenses of dependencies...', async () => {
      await exec.exec(`"${liccheckPath}"`, commandOptions)
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
