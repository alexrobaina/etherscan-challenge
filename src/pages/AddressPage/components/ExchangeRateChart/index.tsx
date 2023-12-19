import ReactECharts from 'echarts-for-react'
import { FC, useMemo } from 'react'

import { BaseAlert } from '../../../../components/common/BaseAlert'
import useScreenWidth from '../../../../hooks/useScreenWidth'

interface Props {
  data: {
    exchangeRates: {
      id: string
      amount: number
      currency: string
      createdAt: string
      exchangeRate: number
    }[]
  }
}

export const ExchangeRateChart: FC<Props> = ({ data }) => {
  const screenWidth = useScreenWidth(900)

  const dates = useMemo(() => {
    if (!data) return []
    return [...new Set(data.exchangeRates.map((item) => item.createdAt))]
  }, [data])

  const processAmountsAndRates = (
    currencyType: string,
    valueType: 'amount' | 'exchangeRate',
  ) => {
    if (!data) return []
    return dates.map((date) => {
      const record = data.exchangeRates.find(
        (item) => item.createdAt === date && item.currency === currencyType,
      )

      return record ? record[valueType as keyof typeof record] : 0
    })
  }

  const usdAmounts = useMemo(
    () => processAmountsAndRates('USD', 'amount'),
    [data, dates],
  )
  const eurAmounts = useMemo(
    () => processAmountsAndRates('EUR', 'amount'),
    [data, dates],
  )
  const usdExchangeRates = useMemo(
    () => processAmountsAndRates('USD', 'exchangeRate'),
    [data, dates],
  )
  const eurExchangeRates = useMemo(
    () => processAmountsAndRates('EUR', 'exchangeRate'),
    [data, dates],
  )

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [
        'USD Amount',
        'EUR Amount',
        'USD ETH Exchange Rate',
        'EUR ETH Exchange Rate',
        'Difference in Exchange Rates',
      ],
      bottom: 0,
      orient: 'horizontal',
    },
    grid: {
      left: screenWidth ? '9%' : '6%',
      right: screenWidth ? '9%' : '6%',
      top: screenWidth ? '10%' : '10%',
      bottom: screenWidth ? '30%' : '20%',
    },
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false,
    },
    yAxis: [
      {
        type: 'value',
        name: 'Amount',
      },
      {
        type: 'value',
        name: 'Exchange Rate',
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: 'USD Amount',
        type: 'line',
        data: usdAmounts,
        smooth: true,
      },
      {
        name: 'EUR Amount',
        type: 'line',
        data: eurAmounts,
        smooth: true,
      },
      {
        name: 'USD ETH Exchange Rate',
        type: 'line',
        yAxisIndex: 1,
        data: usdExchangeRates,
        smooth: true,
      },
      {
        name: 'EUR ETH Exchange Rate',
        type: 'line',
        yAxisIndex: 1,
        data: eurExchangeRates,
        smooth: true,
      },
    ],
  }

  return (
    <>
      <div className="shadow-2xl sm:rounded-lg p-8 w-full mt-12 mb-20">
        <h2 className="text-2xl font-semibold mb-5 ">Analytics</h2>
        {data?.exchangeRates.length > 0 ? (
          <ReactECharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            theme={'theme_name'}
          />
        ) : (
          <BaseAlert text="No data available" />
        )}
      </div>
    </>
  )
}
