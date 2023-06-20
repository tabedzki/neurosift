# Neurosift

Interactive neuroscience visualizations in the browser.

Neurosift provides a platform for the creation, visualization, and sharing of complex neuroscience data straight from your web browser. It caters to both individual users through its local mode, allowing the processing of views directly from your device, as well as a remote access function for presenting your findings to other users on different machines. With Neurosift, you have the ability to construct a multitude of synchronized visuals such as spike raster plots, audio spectrograms, videos, video annotations, position decode fields, and timeseries graphs.

## Necessary System Specifications

* Operating Systems: Linux, Mac, or Windows
* Web Browsers: Chrome or Firefox
* Software: NodeJS v16 or higher

## Instructions for Installation and Setup

We suggest installing Neurosift within a conda environment or a virtual environment.

First, clone the repository and install from source:

```bash
git clone https://github.com/scratchrealm/neurosift
cd neurosift/python
pip install -e .
```

Next, create a folder for your data and include some test files:

```bash
mkdir -p ~/rtcshare_data/test
cd ~/rtcshare_data/test
# transfer some data files into this test directory, these could be in .mp4, .avi, or .py formats
```

Share the data folder utilizing rtcshare:

```bash
cd ~/rtcshare_data
rtcshare start --dir .
# keep this terminal window running
```

Go to https://scratchrealm.github.io/neurosift in your web browser. From here, you should be able to navigate to the test directory and see your files. You can then click on the files to visualize them.

## Remote Access Capability

To make your visualizations remotely accessible, for instance, to share your work with colleagues, simply add the --enable-remote-access option to rtcshare:

```bash
cd ~/rtcshare_data
rtcshare start --dir . --enable-remote-access
```

Then you will need to modify the URL in your web browser to include the remote access server address. (TODO: explain how to do this)

## Visualizations

* [Videos](./doc/videos.md)
* [Video annotations](./doc/video_annotations.md)
* [Timeseries graphs](./doc/timeseries_graphs.md)
* [Audio spectrograms](./doc/audio_spectrograms.md)
* [Spike raster plots](./doc/spike_raster_plots.md)
* [Position decode fields](./doc/position_decode_fields.md)

## Contributing

We welcome feedback and code contributions. Please submit a pull request or open an issue.

## License

Neurosift is licensed under the terms of the Apache License 2.0.

## Authors

Jeremy Magland, Jeff Soules, and Ralph Peterson