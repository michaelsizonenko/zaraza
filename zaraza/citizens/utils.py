import re

prog = re.compile(r'\+380\d{9}')


def validate_phone_number(number):
    return prog.match(number)[0]
