import React, { useState } from 'react'
import '../../assets/styles/main.css'
import Navigation from '../../components/settings/Navigation'
import StreamsComp from '../../components/settings/StreamsComp'

import ClassesComp from '../../components/settings/ClassesComp'
import ClassLevels from '../../components/settings/ClassLevels'

function ClassesStreams() {
  return (
    <div className="w-full">
      <div className="p-2 h-screen  mt-2 w-full">
        <div className="flex mt-5">
          <div className="w-1/3 border-r-2 border-gray1 mr-2">
            <ClassLevels />
          </div>
          <div className="w-1/3 h-[90vh] mr-2">
            <ClassesComp />
          </div>
          <div className="w-1/3 border-r-2 border-gray1 mr-5">
            <StreamsComp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassesStreams
