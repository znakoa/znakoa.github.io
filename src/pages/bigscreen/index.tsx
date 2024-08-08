// import { Iconstyle } from '/icon/iconfont'
import { Globalstyle } from './style/global'
import LayoutPage from "@site/src/pages/bigscreen/_components/IndexPage/layout";


export default function Bigscreen() {
  return (
    <>
      <Globalstyle></Globalstyle>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: ' translate(-50%, -50%)',
        }}>
         <LayoutPage></LayoutPage>
      </div>
      )
    </>
  )
}
