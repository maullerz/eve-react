import startsWith from 'lodash/startsWith'
import types from './typeIDs.json'
import materials from './invTypeMaterials.json'
import schemes from './sheet_schemes.json'

const fs = require('fs')


function getItemByTypeID(typeId) {
  return types[typeId]
}

const getUnrefOutputsTypeId = () => {
  const unrefReactions = Object.keys(schemes).filter(reactTypeId => {
    // console.log(reactTypeId, schemes[reactTypeId].name)
    return startsWith(schemes[reactTypeId].name, 'Unref')
  })

  // console.log('unrefReactions:', unrefReactions)
  return unrefReactions.map(key => schemes[key].output.typeId)
}


const unrefOutputIds = getUnrefOutputsTypeId()
// console.log('unrefOutputIds:', unrefOutputIds)


const refinedOutputs = {}
unrefOutputIds.forEach(typeId => {
  const mats = materials.filter(m => m.typeID === typeId)
  const outputs = mats.map(m => {
    const item = getItemByTypeID(m.materialTypeID)
    return {
      typeId: m.materialTypeID,
      name: item.name.en,
      quantity: m.quantity,
      volume: item.volume,
      grpId: item.groupID,
      iconId: item.iconID,
      // nameRu: item.name.ru,
      // data: getItemByTypeID(m.materialTypeID),
    }
  })
  refinedOutputs[typeId] = outputs
})

fs.writeFileSync('./src/app/components/resourses/moon/refinedOutputs.json', JSON.stringify(refinedOutputs, null, 2) , 'utf-8')

console.log('refinedOutputs:', JSON.stringify(refinedOutputs, null, 2))
