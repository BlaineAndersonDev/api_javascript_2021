var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    if (actionConfirm()) {
      console.log(`You are ${answers.first_name} ${answers.last_name}!`)
    } else {

    }
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
  

actionObtainName = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What's your first name",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What's your last name",
        default() {
          return 'Doe';
        },
      },
    ])
    .then((answers) => {
      if (answers.confirm === 'Y') {
        return true
      } else if (answers.confirm === 'N') {
        return false
      } else {
       console.log(`Please input 'Y' or 'N'.`)
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}  
  
actionConfirm = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'confirm',
        message: "Are you sure? [Y, N]",
      }
    ])
    .then((answers) => {
      if (answers.confirm === 'Y') {
        return true
      } else if (answers.confirm === 'N') {
        return false
      } else {
       console.log(`Please input 'Y' or 'N'.`)
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}  

  