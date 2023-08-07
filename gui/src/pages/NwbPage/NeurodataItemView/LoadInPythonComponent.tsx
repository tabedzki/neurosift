import { create } from "@mui/material/styles/createTransitions"
import { FunctionComponent, useMemo } from "react"
import { useModalDialog } from "../../../ApplicationBar"
import Hyperlink from "../../../components/Hyperlink"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import Markdown from "../../../Markdown/Markdown"
import { useNwbFile } from "../NwbFileContext"
import { RemoteH5Group } from "../RemoteH5File/RemoteH5File"
import { findViewPluginsForType, ViewPlugin } from "../viewPlugins/viewPlugins"

type Props = {
    path: string
    group: RemoteH5Group
    viewName: string
}

const LoadInPythonComponent: FunctionComponent<Props> = ({path, group, viewName}) => {
    const {visible: windowVisible, handleOpen: handleOpenWindow, handleClose: handleCloseWindow} = useModalDialog()

    return (
        <div>
            <Hyperlink onClick={handleOpenWindow}>Load in Python</Hyperlink>
            <ModalWindow
                open={windowVisible}
                onClose={handleCloseWindow}
            >
                <LoadInPythonWindow
                    path={path}
                    group={group}
                    viewName={viewName}
                />
            </ModalWindow>
        </div>
    )
}

const LoadInPythonWindow: FunctionComponent<Props> = ({path, group, viewName}) => {
    const nwbFile = useNwbFile()
    const source = useMemo(() => {
        const viewPlugin = findViewPluginsForType(group.attrs.neurodata_type, {nwbFile}).defaultViewPlugin
        return createSource(nwbFile.url, viewPlugin, path, group, viewName)
    }, [path, group, viewName, nwbFile])
    return (
        <Markdown
            source={source}
        />
    )
}

const createSource = (url: string, viewPlugin: ViewPlugin | undefined, path: string, group: RemoteH5Group, viewName: string) => {
    const backtics = '```'
    const backtic = '`'
    const nt = group.attrs.neurodata_type
    let customCode = viewPlugin && viewPlugin.getCustomPythonCode ? viewPlugin.getCustomPythonCode(group) : ''
    return `
## Loading ${backtic}${path}${backtic} (${backtic}${group.attrs.neurodata_type}${backtic}).

${backtics}bash
# Prerequisites:
pip install h5py remfile
${backtics}

${backtics}python
import h5py
import remfile

url = '${url}'

# open the remote file
f = h5py.File(remfile.File(url), 'r')

# load the neurodata object
X = f['${path}']
${customCode}
${backtics}

## Notes

See [remfile](https://github.com/magland/remfile) for more information on loading remote files.

`
}

export default LoadInPythonComponent