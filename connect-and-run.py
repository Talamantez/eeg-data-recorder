from subprocess import Popen

commands = [
	'gort bluetooth pair 20:68:9D:4C:0D:B7','gort bluetooth connect 20:68:9D:4C:0D:B7',    
    'sleep 14;node app.js'
]

processes = [Popen(cmd, shell=True) for cmd in commands]
for p in processes: p.wait()