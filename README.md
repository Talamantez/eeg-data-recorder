eeg-data-recorder
=================
### Have the following installed

- Ubuntu
- Gort cli (http://gort.io/)
- node version 0.10.33 (node-serialport is dependent on this)
- python 2.7
- grunt
- bower

### Install and Run
* Clone the repo, then install dependencies with:
```
	npm install && bower install
```

* Then build the project with:
```
	grunt --force
```

* Then, put the Headset into discoverable mode and type:
```
	npm start
```

* After the headset has connected and data starts reading out in the terminal, 
open your browser to localhost:3000 to see average data and a time-series readout.

To Do:

* Signal Analysis
   * noise filtering
     * band pass
     * high pass
     * low pass
