export interface Chart {
    type: string,
    data: {
        labels: [
            Array<string>
        ],
        datasets: [
            {
                label: string,
                data: [
                   Array<number>
                ],
                borderColor: string,
                fill: boolean
            }
        ]
    }
  }