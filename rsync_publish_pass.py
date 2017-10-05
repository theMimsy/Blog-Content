from pexpect import popen_spawn
import sys
import re

child = popen_spawn.PopenSpawn('ssh dawidminorczyk@mimsy.io')
print('1')
child.expect('Enter passphrase for key')
print('2')
child.sendline('5d0egTqPWF7i')
print('3')
