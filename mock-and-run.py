from subprocess import Popen

commands = [
	'grunt notest',    
    'sleep 14;node app.js'
]

processes = [Popen(cmd, shell=True) for cmd in commands]
for p in processes: p.wait()