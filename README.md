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
	grunt notest
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

* theta/beta power ratio (adhd)
	' A well-established phenomenon is that slow wave/fast wave ratios (SW/FW) are increased in attention-deficit/hyperactivity disorder'
		(http://www.ncbi.nlm.nih.gov/pubmed/19897008)

* upper/low alpha frequency (MCI, Alzheimers)
	(http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3807715/)

* Relative Band Ratio (RBR), Shannon Entropy, Kullback-Leibler (KL) Entropy 
	(drowsiness detection)
	(http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3342623/) 
------------------------------------------------

Put stuff on your path
export PATH=$PATH:$HOME/go/bin
export PATH=$PATH:$HOME/gort/bin

