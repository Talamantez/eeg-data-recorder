from subprocess import Popen

commands = [
	'gort bluetooth unpair 20:68:9D:4C:0D:B7 hci0 ; gort bluetooth connect 20:68:9D:4C:0D:B7 hci0',    
    'sleep 10;node app.js'
]
# run in parallel
processes = [Popen(cmd, shell=True) for cmd in commands]
# do other things here..
# wait for completion
for p in processes: p.wait()