from django.apps import AppConfig
import logging

# Get an instance of a logger
logger = logging.getLogger('root')


class CitizensConfig(AppConfig):
    name = 'citizens'
