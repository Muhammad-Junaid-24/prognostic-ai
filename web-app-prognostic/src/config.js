// exports.apiUrl = "https://api-prognostic.demoibsservices.com";
// exports.apiUrl = "http://localhost:8088";



const configs = {
    appTitle: process.env.REACT_APP_NAME || 'prognostic',
    appEnvironment: process.env.REACT_APP_ENVIRONMENT,
    apiUrl: process.env.REACT_APP_API_URL,
    publicURL: process.env.PUBLIC_URL,
  }
  
  export default configs

  