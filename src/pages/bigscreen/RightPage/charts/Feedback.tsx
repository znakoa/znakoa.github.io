import EChartsCommon from '@site/src/components/EChartsCommon'
import { FeedbackOptions } from './offlinePortalOptions'
import useConfigStore from '@site/src/store/index'


export const Feedback = (props) => {
  const renderer = useConfigStore((state) => state.renderer)

  return (
    <div
      style={{
        width: '100px',
        height: '100px'
      }}
    >
      <EChartsCommon
        renderer={renderer}
        option={FeedbackOptions(props.FeedbackData)}
      />
    </div>
  )
}

export default Feedback
