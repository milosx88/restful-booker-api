# Automation repo for Restful-booker applications

## Setting-up project

- Clone project to local machine
- Run `npm install`

### Required prerequisites

- Install _NODE.js_ - version [20.x.x](https://nodejs.org/en/). For better version managing, use version managing tools like:

  - [volta](https://docs.volta.sh/guide/)
  - [nvm](https://heynode.com/tutorial/install-nodejs-locally-nvm/)
  - [fnm](https://github.com/Schniz/fnm)

  ### Optional prerequisites

- _IDE Extensions_:
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - Go to Code > Preferences > Settings in search bar enter Formatter, then for `Editor: Default Formatter` set it to `Prettier - Code Formatter`
  - Make sure to check `Editor: Format On Save` or which ever save action option your prefer
  - setup _.eslilnt.js_ and _.eslintignore_ files
  - setup _.prettierrc.json_ and _.prettierignore_ files

## Run API tests

`npx playwright test --project=api`
