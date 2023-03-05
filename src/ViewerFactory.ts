import { DefaultLightConfiguration, Viewer } from '@speckle/viewer'

const params = {
  showStats: false,
  environmentSrc: null,
  verbose: true
}

const token = 'bed58b06ea8748298232ffe7920f156d82da859484'

type FilteringState = {
  selectedObjects?: string[]
  hiddenObjects?: string[]
  isolatedObjects?: string[]
  colorGroups?: Record<string, string>[]
  activePropFilterKey?: string
}

interface LightConfiguration {
  enabled?: boolean
  castShadow?: boolean
  intensity?: number
  color?: number
  indirectLightIntensity?: number
}

const lightConfig: LightConfiguration = {
  enabled: true,
  castShadow: false,
  indirectLightIntensity: 5
}

export default class ViewerFactory {
  static async create(streamUrl: string, container: HTMLElement): Viewer {
    const viewer = new Viewer(container, params)
    viewer.toggleCameraProjection()
    viewer.setLightConfiguration(lightConfig)
    await viewer.init()
    await viewer.loadObject(streamUrl, token)
    viewer.hideObjects(['4d6113c8bd1dcd816dc1aede4a57131e'])
    viewer.zoom()
    const views = viewer.getViews()

    const dataTree = viewer.getDataTree()

    const objects = dataTree.findAll((guid, obj) => {
      const boolRoom = obj.speckle_type != 'Objects.BuiltElements.Room'
      const boolWalls = obj.type != 'Generic - 300mm'
      const bool = boolRoom && boolWalls

      return bool
    })

    const ids = objects.map((o) => o.id) as string[]

    viewer.isolateObjects(ids, undefined, undefined, true)

    return viewer
  }
}
