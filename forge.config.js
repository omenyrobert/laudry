const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(process.cwd(), 'assets', 'favicon.ico')
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'SoftwareWaffe',
        description: 'School management system'
      }
    },
    /*
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO'
      }
    },
    {
      name: '@electron-forge/maker-zip'
    } */
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'jim-junior',
          name: 'schoolApp'
        },
        prerelease: false,
        draft: true
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {}
    }
  ]

};