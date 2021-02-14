import * as core from '@actions/core'
// import * as exec from '@actions/exec'
// import { wait } from './wait'

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
      level: core.getInput('level'),
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
    const inputs: IActionInputs = await parseInputs()
    const command: string[] = [
      '-s',
      inputs.strategyIniFile,
      '-r',
      inputs.requirementsTxtFile,
      '-l',
      inputs.level,
    ]
    core.setOutput('inputs', inputs)
    core.setOutput('command', command)
  } catch (error) {
    core.setFailed(error.message)
  }
}

// async function test(): Promise<void> {
//   try {
//     const inputs: IActionInputs = await parseInputs()
//     core.debug(`Inputs: ${inputs}`)
//     // await exec.exec('liccheck', [
//     //   '-s',
//     //   'examples/my_strategy.ini',
//     //   '-r',
//     //   'examples/requirements.txt',
//     //   '-l',
//     //   'PARANOID',
//     // ])
//   } catch (error) {
//     core.setFailed(error.message)
//   }
// }

run()
