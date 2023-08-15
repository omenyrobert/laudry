module.exports = {
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
          owner: 'omenyrobert',
          name: 'schoolSoftApp'
        },
        prerelease: true
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