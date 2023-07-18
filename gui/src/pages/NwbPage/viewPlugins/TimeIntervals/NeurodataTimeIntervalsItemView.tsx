import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { FunctionComponent, useState } from "react"
import DynamicTableView from "../DynamicTable/DynamicTableView"
import NwbTimeIntervalsView from "./NwbTimeIntervalsView"

type Props = {
    width: number
    height: number
    path: string
    condensed?: boolean
}

type ViewMode = 'timeseries' | 'table'

const NeurodataTimeIntervalsItemView: FunctionComponent<Props> = ({ width, height, path }) => {
    const topBarHeight = 50

    const [viewMode, setViewMode] = useState<ViewMode>('timeseries')

    return (
        <div style={{ position: 'absolute', width, height }}>
            <div style={{ position: 'absolute', width, height: topBarHeight, paddingLeft: 10}}>
                <ViewModeToggleButton viewMode={viewMode} setViewMode={setViewMode} />
            </div>
            {/* Important to use undefined rather than visible so that the hidden value is respected for parent components */}
            <div style={{ position: 'absolute', width, height: height - topBarHeight, top: topBarHeight, visibility: viewMode === 'table' ? undefined : 'hidden' }}>
                <DynamicTableView
                    width={width}
                    height={height - topBarHeight}
                    path={path}
                />
            </div>
            <div style={{ position: 'absolute', width, height: height - topBarHeight, top: topBarHeight, visibility: viewMode === 'timeseries' ? undefined : 'hidden' }}>
              <NwbTimeIntervalsView
                    width={width}
                    height={height - topBarHeight}
                    path={path}
                />
            </div>
        </div>
    )
}

type ViewModeToggleButtonProps = {
    viewMode: ViewMode
    setViewMode: (mode: ViewMode) => void
}

const ViewModeToggleButton: FunctionComponent<ViewModeToggleButtonProps> = ({ viewMode, setViewMode }) => {
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newViewMode: string
    ) => {
        setViewMode(newViewMode as ViewMode)
    }
    return (
        <ToggleButtonGroup
            color="primary"
            value={viewMode}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="timeseries">Timeseries</ToggleButton>
            <ToggleButton value="table">Table</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default NeurodataTimeIntervalsItemView