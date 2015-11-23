from subprocess import Popen

commands = [
	'bluetooth-agent 0000',
	'sudo rfcomm connect rfcomm0 20:68:9D:4C:0D:B7'
	'sleep 5;gort bluetooth pair 20:68:9D:4C:0D:B7','gort bluetooth connect 20:68:9D:4C:0D:B7',    
    'sleep 10;node app.js'
]

processes = [Popen(cmd, shell=True) for cmd in commands]
for p in processes: p.wait()