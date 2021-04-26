const { Octokit } = require("@octokit/action");

const octokit = new Octokit();

async function is_runner_running () {
  for (var i=0; i < 3000; i++) {
    const result = await octokit.request('GET /repos/Homebrew/homebrew-core/actions/runners')
    const { runners: [{ status, busy }] } = result.data
    if (busy == false) {
      // Return "true" once the self-hosted runner is not busy anymore
      console.log("true");
      break;
    }

    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

is_runner_running()
