import EChartsCommon from '@site/src/components/EChartsCommon'
import { trafficOptions } from './options'
import useConfigStore from "@site/src/store";

const TrafficSituation = props => {
  const renderer = useConfigStore((state) => state.renderer)

  return (
    <div
      style={{
        width: '430px',
        height: '250px'
      }}
    >
      {props.trafficStatus ? (
        <EChartsCommon renderer={renderer} option={trafficOptions(props.trafficStatus)} />
      ) : (
        ''
      )}
    </div>
  )
}

export default TrafficSituation
