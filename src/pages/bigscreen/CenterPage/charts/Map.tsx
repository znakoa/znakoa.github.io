import EChartsCommon from '@site/src/components/EChartsCommon'
import { mapOptions } from './options'
import useConfigStore from '@site/src/store/index'

const Map = ({ mapData }) => {
  const renderer = useConfigStore((state) => state.renderer)
  return (
    <div
      style={{
        width: '920px',
        height: '650px'
      }}
    >
      {(mapData) ? (
        <EChartsCommon
          renderer={renderer}
          option={mapOptions(mapData)}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default Map
