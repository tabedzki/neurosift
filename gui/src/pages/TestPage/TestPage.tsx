import { FunctionComponent, useEffect, useState } from "react"
import nwb from 'webnwb' 
import NwbView from "./NwbView"

type Props = {
    width: number
    height: number
}

// const url = 'https://api.dandiarchive.org/api/assets/29ba1aaf-9091-469a-b331-6b8ab818b5a6/download/'
const url = 'https://dandiarchive.s3.amazonaws.com/blobs/c86/cdf/c86cdfba-e1af-45a7-8dfd-d243adc20ced'

const TestPage: FunctionComponent<Props> = ({width, height}) => {
    const [nwbFile, setNwbFile] = useState<any>(undefined)
    useEffect(() => {
        const load = async () => {
            const io = new nwb.NWBHDF5IO()
            console.log('loading 1')
            const file = await io.load(url, { useStreaming: true })
            console.log('loading 2')
            ; (window as any)._file = file
            setNwbFile(file)
        }
        load()
    }, [])
    if (!nwbFile) return <div>Loading {url}</div>
    return (
        <NwbView
            width={width}
            height={height}
            nwbFile={nwbFile}
        />
    )
}

export default TestPage