import { FunctionComponent, useEffect, useState } from "react"
import NwbView_Wasm from "./NwbView_Wasm"
import { getRemoteH5File, RemoteH5File } from "./RemoteH5File/RemoteH5File"

type Props = {
    width: number
    height: number
}

// const url = 'https://api.dandiarchive.org/api/assets/29ba1aaf-9091-469a-b331-6b8ab818b5a6/download/'
const url = 'https://dandiarchive.s3.amazonaws.com/blobs/c86/cdf/c86cdfba-e1af-45a7-8dfd-d243adc20ced'

const TestPage_Wasm: FunctionComponent<Props> = ({width, height}) => {
    const [nwbFile, setNwbFile] = useState<RemoteH5File | undefined>(undefined)
    useEffect(() => {
        let canceled = false
        const load = async () => {
            const f = await getRemoteH5File(url)
            if (canceled) return
            setNwbFile(f)
        }
        load()
        return () => {canceled = true}
    }, [])
    if (!nwbFile) return <div>Loading {url}</div>
    return (
        <NwbView_Wasm
            width={width}
            height={height}
            nwbFile={nwbFile}
        />
    )
}

export default TestPage_Wasm