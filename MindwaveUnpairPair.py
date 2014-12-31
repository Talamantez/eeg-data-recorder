# python script to call gort bluetooth
# connection commands

from subprocess import call
call(["gort", "bluetooth", "unpair", "20:68:9D:4C:0D:B7", "hci0"])
call(["gort", "bluetooth", "connect", "20:68:9D:4C:0D:B7", "hci0"])
