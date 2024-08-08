import { useEffect, useRef } from 'react'
import { LayoutStyle, IndexPageStyle, IndexPageContent } from './style'
import {previewFitScale} from "@site/src/utils/previewScale";
import TopPage from "@site/src/pages/bigscreen/_components/TopPage";
import {CenterPageIndex} from "@site/src/pages/bigscreen/_components/CenterPage";
import LeftPageIndex from "@site/src/pages/bigscreen/_components/LeftPage";
import RightPageIndex from "@site/src/pages/bigscreen/_components/RightPage";



// 总页面
export const LayoutPage = () => {
  const scaleDom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const { calcRate, windowResize, unWindowResize } = previewFitScale(
      1920,
      1080,
      scaleDom.current
    )
    calcRate()
    windowResize()
    return () => {
      unWindowResize()
    }
  }, [])

  return (
    <LayoutStyle ref={scaleDom} className="scale-layout">
       <IndexPageStyle>
      <TopPage />
        <IndexPageContent>
          <LeftPageIndex />
          <CenterPageIndex />
          <RightPageIndex />
        </IndexPageContent>
       </IndexPageStyle>
    </LayoutStyle>
  )
}

export  default LayoutPage