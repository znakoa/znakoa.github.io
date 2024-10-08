import { useEffect, useState } from 'react'
import { CenterPage, CenterBottom } from './style'
import Map from './charts/Map'
import centerPageData, { centerPageDataType } from '@site/src/api/mock/centerPageData'
// import { get } from '@site/src/api/http'
// import { ResultEnum } from '@site/src/enums/httpEnum'
// import { centerPageDataApi } from '@site/src/api/mock/index'



const fetchImageDom = (index: number, title: string) => {
  const imageUrl = `/assets/images/center-details-data${index}.png`;
  return <img src={imageUrl} alt={title} />;
}

export  const CenterPageIndex = () => {

  const [centerData, setCenterData] = useState<centerPageDataType | undefined>(undefined)

  const fetchData = async () => {
    // const res = await get(centerPageDataApi)
    // if (res.code === ResultEnum.SUCCESS) {
    //   setCenterData(res.data)
    // }
    setCenterData(centerPageData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return centerData ? (
    <CenterPage className='center-page'>
      <Map mapData={centerData.mapData}></Map>
      <CenterBottom>
        <div className='detail-list'>
          {centerData.detailsList
            ? centerData.detailsList.map((item, index) => {
              return (
                <div className='detail-list-item' key={index}>
                  {fetchImageDom(index + 1, item.title)}
                  <div className='detail-item-text'>
                    <h3>{item.title}</h3>
                    <span>{item.number}</span>
                    <span className='unit'>{item.unit}</span>
                  </div>
                </div>
              )
            })
            : ''}
        </div>
      </CenterBottom>
    </CenterPage>
  ) : (
    <div>loading...</div>
  )
}

export  default  CenterPageIndex