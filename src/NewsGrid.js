import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import Feed from './Feed'

const ResponsiveGridLayout = WidthProvider(Responsive)

const layouts = {
  lg: [
    {
      i: 'a', x: 0, y: 0, w: 2, h: 8,
    },
    {
      i: 'b', x: 2, y: 0, w: 2, h: 8,
    },
    {
      i: 'c', x: 4, y: 0, w: 2, h: 8,
    },
  ],
}

const NewsGrid = () => {
  const breakpoints = {
    lg: 1200, md: 996, sm: 768, xs: 480,
  }
  const cols = {
    lg: 8, md: 6, sm: 4, xs: 2,
  }
  return (
    <ResponsiveGridLayout
      breakpoints={breakpoints}
      cols={cols}
      draggableCancel=".nondraggable"
      margin={[4, 4]}
      layouts={layouts}
      rowHeight={30}
    >
      <div key="a">
        <Feed url="https://www.spiegel.de/video/index.rss" />
      </div>
      <div key="b">
        <Feed url="https://www.ccc.de/de/rss/updates.xml" />
      </div>
      <div key="c">
        <Feed url="https://techcrunch.com/feed/" />
      </div>
    </ResponsiveGridLayout>
  )
}

export default NewsGrid
