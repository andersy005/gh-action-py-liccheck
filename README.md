# `andersy005/gh-action-py-liccheck`

This GitHub action checks license of Python packages and their dependencies via the [liccheck](https://github.com/dhatim/python-license-check) package.

## Usage

To integrate this action with your action pipelines, add the following step to your workflow file (e.g. `.github/workflows/ci.yml`)

```yaml
- name: License Checker
  uses: andersy005/gh-action-py-liccheck@main
  with:
    strategy-ini-file: ./pyproject.toml
    level: standard
    requirements-txt-file: ./requirements.txt
    no-deps: true
```

## Arguments

This action currently supports five inputs from teh user: `strategy-ini-file`, `level`, `requirements-txt-file`, `no-deps`, and `reporting-txt-file`.

These inputs, along with their descriptions and usage contexts, are listed in the table below:

|          Input          |                                                                                                  Description                                                                                                   |  Usage   |       Default        |
| :---------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------: | :------------------: |
|   `strategy-ini-file`   |                                                                          Path to a strategy ini file or a pyproject.toml file to use.                                                                          | Optional |  `./pyproject.toml`  |
| `requirements-txt-file` |                                                                                    Path to a requirements.txt file to use.                                                                                     | Optional | `./requirements.txt` |
|        `no-deps`        |                                                                                     Whether **not** to check dependencies.                                                                                     | Optional |       `false`        |
|         `level`         | Level for testing compliance of packages, where: `standard` - At least one authorized license (default); `cautious` - Per standard but no unauthorized licenses; `paranoid` - All licenses must by authorized. | Optional |      `standard`      |

## Contributing

Contributions are welcome!

## License

The code and documentation in this project are released under the
[MIT License](LICENSE).
