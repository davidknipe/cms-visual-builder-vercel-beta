import 'server-only' //This is a server side file

// Get React Cache
import { cache } from 'react'

// Get the parts from the Optimizely CMS SDK
import { getFactory, RichTextComponentDictionary } from '@remkoj/optimizely-cms-react/rsc'

// Get the implementation parts
import { prefixDictionaryEntries } from "@/components/utils"
import cmsComponents from './cms'
import components from './component'
import NodeComponent from './node'

export const getComponentFactory = cache(() => {
    const factory = getFactory()
    
    prefixDictionaryEntries(components, "Component")
    
    factory.registerAll(cmsComponents)
    factory.registerAll(components)
    factory.registerAll(RichTextComponentDictionary)
    factory.register('Node', NodeComponent)

    /*console.log("Factory contents")
    factory.extract().forEach(x => {
        console.log(`  - ${ Array.isArray(x.type) ? x.type.join('/') : x.type }`)
    })*/

    return factory
})

export default getComponentFactory