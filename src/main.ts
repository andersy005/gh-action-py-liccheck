import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as fs from 'fs'

export interface IActionInputs {
  readonly strategyIniFile: string
  readonly level: string
  readonly requirementsTxtFile: string
  readonly reportingTxtFile: string
  readonly noDeps: string
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
      const strategy = fs.readFileSync(inputs.strategyIniFile, 'utf-8')
      core.info(strategy)
    })

    await core.group('Checking licenses for ...', async () => {
      const requirements = fs.readFileSync(inputs.requirementsTxtFile, 'utf-8')
      core.info(requirements)
    })

    const commandOptions: string[] = []
    const tomls = ['pyproject.toml', './pyproject.toml']
    if (!(inputs.strategyIniFile in tomls)) {
      commandOptions.push(...['-s', inputs.strategyIniFile])
    }

    commandOptions.push(
      ...[
        '-r',
        inputs.requirementsTxtFile,
        '-l',
        inputs.level,
        '-R',
        inputs.reportingTxtFile,
      ]
    )

    if (inputs.noDeps === 'true') {
      commandOptions.push('--no-deps')
    }

    await core.group('Running the license checker...', async () => {
      await exec.exec(`"${liccheckPath}"`, commandOptions)
    })

    await core.group('License Checker Report ...', async () => {
      const report = fs.readFileSync(inputs.reportingTxtFile, 'utf-8')
      core.info(report)
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
