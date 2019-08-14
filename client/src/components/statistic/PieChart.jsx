import React from 'react'

import { ResponsivePie } from '@nivo/pie'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
    {
      "id": "c",
      "label": "c",
      "value": 41,
      "color": "hsl(9, 70%, 50%)"
    },
    {
      "id": "hack",
      "label": "hack",
      "value": 319,
      "color": "hsl(48, 70%, 50%)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 165,
      "color": "hsl(264, 70%, 50%)"
    },
    {
      "id": "php",
      "label": "php",
      "value": 99,
      "color": "hsl(307, 70%, 50%)"
    },
    {
      "id": "make",
      "label": "make",
      "value": 425,
      "color": "hsl(163, 70%, 50%)"
    }
  ]
  // make sure parent container have a defined height when using
  // responsive component, otherwise height will be 0 and
  // no chart will be rendered.
  // website examples showcase many properties,
  // you'll often use just a few of them.
  const MyResponsivePie = () => (
      <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.8}
          padAngle={2}
          cornerRadius={2}
          colors={{ scheme: 'yellow_orange_red' }}
          borderWidth={2}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.6' ] ] }}
          radialLabelsSkipAngle={1}
          radialLabelsTextXOffset={9}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={5}
          radialLabelsLinkDiagonalLength={20}
          radialLabelsLinkHorizontalLength={12}
          radialLabelsLinkStrokeWidth={4}
          radialLabelsLinkColor={{ from: 'color' }}
          slicesLabelsSkipAngle={9}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: 'ruby'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'c'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'go'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'python'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'scala'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'lisp'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'elixir'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'javascript'
                  },
                  id: 'lines'
              }
          ]}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000'
                          }
                      }
                  ]
              }
          ]}
      />
  )

export default MyResponsivePie;