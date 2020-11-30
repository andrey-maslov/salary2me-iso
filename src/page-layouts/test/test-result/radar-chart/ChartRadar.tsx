import React from 'react'
import { Radar } from 'react-chartjs-2'
import { ITendency } from 'psychology/build/main/types/types'
import { useMediaPredicate } from 'react-media-hook'
import { COLORS } from '../../../../constants/constants'
import hexToRgba from '../../../../helper/hexToRgba'
import style from './radar-chart.module.scss'

type ChartsPropsType = {
    profile: readonly ITendency[]
    chartLabels: string[]
    label?: string
}

const ChartRadar: React.FC<ChartsPropsType> = ({ profile, chartLabels, label }) => {

    const chartRadarOptions: any = {
        desktop: {
            width: 550,
            height: 420,
            labels: chartLabels,
        },
        mobi: {
            width: 350,
            height: 300,
            labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        }
    }

    const isMobi = useMediaPredicate('(max-width: 600px)')

    const currentOptions = !isMobi ? { ...chartRadarOptions.desktop } : { ...chartRadarOptions.mobi };

    const data = {
        labels: currentOptions.labels,
        datasets: [
            {
                label: label && '',
                backgroundColor: hexToRgba(COLORS.orange, .5),
                pointBackgroundColor: COLORS.orange,
                borderColor: COLORS.orange,
                pointRadius: 7,
                data: profile.map(item => item.value)
            }
        ]
    }

    // chartjs.org/docs/latest/configuration/tooltip.html#tooltip-callbacks
    const options = {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        scale: {
            reverse: false,
            gridLines: {
                color: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
            },
            ticks: {
                // suggestedMax: 30,
                beginAtZero: true
            },
            pointLabels: {
                fontSize: 15
            }
        },
        tooltips: {
            // enabled: false,
            callbacks: {
                title (tooltipItem: any) {
                    const i = tooltipItem[0].index
                    return chartLabels[i]
                },
            }
        },
    }

    return (
        <div className={style.wrapper}>
            <Radar
                data={data}
                options={options}
                width={currentOptions.width}
                height={currentOptions.height}
            />
        </div>
    )
}

export default ChartRadar