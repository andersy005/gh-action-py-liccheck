# `andersy005/gh-action-py-liccheck`

This GitHub action checks license of Python packages and their dependencies via the [liccheck](https://github.com/dhatim/python-license-check) package.

## Usage

To integrate this action with your action pipelines, add the following step to your workflow file (e.g. `.github/workflows/ci.yml`).

### Basic

The basic usage uses the default values defined in table below. Therefore, as a user you don't have to specify any argument:

```yaml
- name: License Checker
  uses: andersy005/gh-action-py-liccheck@main
```

### With custom locations for strategy and requirements files

```yaml
- name: License Checker
  uses: andersy005/gh-action-py-liccheck@main
  with:
    strategy-ini-file: ./my-strategy.ini
    level: standard
    requirements-txt-file: ./my-requirements.txt
    no-deps: true
```

## Arguments

This action currently supports five inputs from teh user: `strategy-ini-file`, `level`, `requirements-txt-file`, `no-deps`, and `reporting-txt-file`.

These inputs, along with their descriptions and usage contexts, are listed in the table below:

|          Input          |                                                                                                  Description                                                                                                   |  Usage   |      Default       |
| :---------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------: | :----------------: |
|   `strategy-ini-file`   |                                                                          Path to a strategy ini file or a pyproject.toml file to use.                                                                          | Optional |  `pyproject.toml`  |
| `requirements-txt-file` |                                                                                    Path to a requirements.txt file to use.                                                                                     | Optional | `requirements.txt` |
|        `no-deps`        |                                                                                     Whether **not** to check dependencies.                                                                                     | Optional |      `false`       |
|         `level`         | Level for testing compliance of packages, where: `standard` - At least one authorized license (default); `cautious` - Per standard but no unauthorized licenses; `paranoid` - All licenses must by authorized. | Optional |     `standard`     |

### Example strategy files

<details>
<summary>Example pyproject.toml</summary>

```toml
[tool.liccheck]
authorized_licenses = [
        "bsd",
        "new bsd",
        "bsd license",
        "new bsd license",
        "simplified bsd",
        "apache",
        "apache 2.0",
        "apache software license",
        "apache software",
        "gnu lgpl",
        "lgpl with exceptions or zpl",
        "isc license",
        "isc license (iscl)",
        "mit",
        "mit license",
        "python software foundation license",
        "zpl 2.1"
]

unauthorized_licenses = [
        "gpl v3"
]

[tool.liccheck.authorized_packages]
uuid = "<=1.30"
```

</details>

<details>
<summary>Example strategy.ini</summary>

```ini
# Authorized and unauthorized licenses in LOWER CASE
[Licenses]
authorized_licenses:
        bsd
        new bsd
        bsd license
        new bsd license
        simplified bsd
        apache
        apache 2.0
        apache software license
        apache software
        gnu lgpl
        lgpl with exceptions or zpl
        isc license
        isc license (iscl)
        mit
        mit license
        python software foundation license
        zpl 2.1

unauthorized_licenses:
        gpl v3

[Authorized Packages]
uuid: 1.30

```

</details>

## Contributing

Contributions are welcome!

## License

The code and documentation in this project are released under the
[MIT License](LICENSE).
