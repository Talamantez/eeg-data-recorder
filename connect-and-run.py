from subprocess import Popen

commands = [
	'gort bluetooth unpair 20:68:9D:4C:0D:B7 hci1 ; gort bluetooth connect 20:68:9D:4C:0D:B7 hci1',    
    'sleep 14;pm2 start app.js'
]

processes = [Popen(cmd, shell=True) for cmd in commands]
for p in processes: p.wait()