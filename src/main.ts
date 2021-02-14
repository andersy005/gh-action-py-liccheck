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
    core.debug(`Inputs: ${inputs}`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
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

// test()
run()
